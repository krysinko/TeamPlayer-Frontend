import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.scss' ]
})
export class AppComponent implements OnInit {
    get username(): string {
        return this.userService.userData ? this.userService.userData.name || this.userService.userData.email : '';
    }

    selectedIndex = 0;
    appPages = [
        {
            title: 'Strona główna',
            url: '/main',
            icon: 'cube-outline'
        },
        {
            title: 'Zadania',
            url: '/tasks',
            icon: 'list-outline'
        },
        {
            title: 'Wydarzenia',
            url: '/events',
            icon: 'calendar-outline'
        },
        {
            title: 'Notatki',
            url: '/note',
            icon: 'reader-outline'
        },
        {
            title: 'Zespoły',
            url: '/teams',
            icon: 'people-outline'
        },
        {
            title: 'Mój profil',
            url: '/my-profile',
            icon: 'person-circle-outline'
        },
    ];

    // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private userService: UserService
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
        const path = window.location.pathname.split('')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
    }
}
