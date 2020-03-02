import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Strona główna',
      url: '/folder/main',
      icon: 'cube-outline'
    },
    {
      title: 'Zadania',
      url: '/folder/tasks',
      icon: 'list-outline'
    },
    {
      title: 'Wydarzenia',
      url: '/folder/events',
      icon: 'calendar-outline'
    },
    {
      title: 'Notatki',
      url: '/folder/note',
      icon: 'reader-outline'
    },
    {
      title: 'Zespoły',
      url: '/folder/teams',
      icon: 'people-outline'
    },
    {
      title: 'Mój profil',
      url: '/folder/my-profile',
      icon: 'person-circle-outline'
    },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
