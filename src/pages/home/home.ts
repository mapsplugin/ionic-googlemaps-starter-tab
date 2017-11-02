import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  mapReady: boolean = false;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.loadMap();
  }

  loadMap() {
    this.map = this.googleMaps.create('map_canvas');

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('map is ready to use');
      this.mapReady = true;
    });
  }

  onButtonClick() {
    if (!this.mapReady) {
      alert('map is not ready yet. Please try again.');
      return;
    }

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        })
      }).then((marker: Marker) => {
        // show the infoWindow
        marker.showInfoWindow();

        // If clicked it, bounce it
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          marker.setAnimation(GoogleMapsAnimation.BOUNCE);
        });
      });
  }

}
