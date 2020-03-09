import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserService} from '../../services/user.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage implements OnInit, OnDestroy {
    subpage: string;
    userLoggedIn: boolean = false;
    componentDestroyed$: Subject<boolean> = new Subject();

    constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
        this.setUserLoginStateSubscription();
    }

    ngOnInit() {
        this.subpage = this.activatedRoute.snapshot.paramMap.get('id');
    }


    goToLoginPage() {
        this.router.navigate(['login']);
    }

    goToRegisterPage() {
        this.router.navigate(['register']);
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
