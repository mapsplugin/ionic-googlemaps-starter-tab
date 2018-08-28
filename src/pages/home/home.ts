import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, private platform: Platform) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      console.log('ionViewDidLoad');
      this.loadMap();
    });
  }

  loadMap() {
    Environment.setEnv({
      // api key for server
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBZamoub9SCWL2GriEBRSgLGVVrF0QPakk',

      // api key for local development
      'API_KEY_FOR_BROWSER_DEBUG': ''
    });

    this.map = GoogleMaps.create('map_canvas');
  }

  onButtonClick() {

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps plugin!',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, bounce it
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        marker.setAnimation(GoogleMapsAnimation.BOUNCE);
      });
    });
  }

}
