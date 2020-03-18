import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AppPages } from '../../../models/app-pages';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: [ './main.page.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage implements OnInit, OnDestroy {
    subpage: string = '';
    userLoggedIn: boolean = false;
    componentDestroyed$: Subject<boolean> = new Subject();

    constructor(private location: Location, private userService: UserService, private router: Router, private appPages: AppPages) {
        this.setUserLoginStateSubscription();
    }

    ngOnInit() {
        this.subpage = this.appPages.getPageDetails(this.location.path()).title;
    }


    goToLoginPage() {
        this.router.navigate([ 'login' ]);
    }

    goToRegisterPage() {
        this.router.navigate([ 'register' ]);
    }

    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
    }

    private setUserLoginStateSubscription() {
        this.userService.userLoggedIn$.pipe(takeUntil(this.componentDestroyed$)).subscribe(state => {
            this.userLoggedIn = state;
        });
    }
}
