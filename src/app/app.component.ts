import { Component } from '@angular/core';
import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
import { registerPlugin } from '@capacitor/core';
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

BackgroundGeolocation.addWatcher(
  {
      backgroundMessage: "Cancel to prevent battery drain.",
      backgroundTitle: "Tracking You.",
      requestPermissions: true,
      stale: false,
      distanceFilter: 50,
  },
  function callback(location:any, error:any) {
      if (error) {
          if (error.code === "NOT_AUTHORIZED") {
              if (window.confirm(
                  "This app needs your location, " +
                  "but does not have permission.\n\n" +
                  "Open settings now?"
              )) {
                  BackgroundGeolocation.openSettings();
              }
          }
          return console.error(error);
      }

      alert('PING !')
      return console.log(location);
  }
).then(function after_the_watcher_has_been_added(watcher_id:any) {
  // BackgroundGeolocation.removeWatcher({
  //     id: watcher_id
  // });
});

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family'];

  constructor() {}

}
