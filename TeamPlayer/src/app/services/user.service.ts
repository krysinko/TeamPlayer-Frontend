import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    get user(): Observable<User> {
        return this._user$;
    }

    set userData(data) {
        this._user$ = data;
    }

    // todo default false
    userLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private _user$: Observable<User>;

    constructor(private router: Router) {
    }

    // TODO odpowiednie typy i obsługa logowania
    logIn(): void {
        this.apiLogIn(null).then(
            () => {
                this.userLoggedIn$.next(true);
                this.writeUserData(null);
                this.router.navigate([ '/' ]);
            }, err => {
            }
        );
    }

    logOut(): boolean {
        this.userLoggedIn$.next(false);
        return true;
    }

    register(userData): void {
        this.apiRegister(userData).then(
            () => {
                alert('User registered!');
                this.writeUserData(userData);
                this.logIn();
                this.router.navigate([ '/' ]);
            },
            err => {
            }
        );
    }

    // todo do as observable
    getTeamMembers(): User[] {
        if (this.userLoggedIn$.getValue()) {
            return [
                {
                    id: 0,
                    username: 'Ania',
                    email: 'ania@cc.cc',
                    description: 'UI Designer'
                },
                {
                    id: 1,
                    username: 'Piotrek',
                    email: 'piotrek@cc.cc',
                    description: 'Key accountant'
                },
                {
                    id: 2,
                    username: 'Ewa',
                    email: 'ewa@cc.cc',
                    description: 'Level designer'
                },
                {
                    id: 3,
                    username: 'Tomek',
                    email: 'tomek@cc.cc',
                    description: 'QA'
                },
                {
                    id: 4,
                    username: 'Pszemek',
                    email: 'pszemek@cc.cc',
                    description: 'Developer'
                },
                {
                    id: 5,
                    username: 'Natalia',
                    email: 'natalia@cc.cc',
                    description: 'Developer'
                },
                {
                    id: 6,
                    username: 'Jurek',
                    email: 'jurek@cc.cc',
                    description: 'CEO'
                },
            ];
        }
    }

    private writeUserData(data): void {
        const usr = new User();
        if (data) {
            if (data.description) {
                usr.description = data.description;
            }
            usr.username = data.name;
            usr.description = '';
        }
        this.userData = usr;
    }

    private apiRegister(userdata): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(true);
            }, 600);
        });
    }

    private apiLogIn(userdata): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(true);
            }, 600);
        });
    }
}
