import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userLoggedIn = false;
    user: User;

    constructor() {
    }

    // TODO odpowiednie typy i obsługa logowania
    logIn(): boolean {
        this.userLoggedIn = true;
        this.user = new User();
        this.user.name = 'Jan Kowalski';
        this.user.id = 0;
        this.user.description = 'I do things';
        return true;
    }

    logOut(): boolean {
        this.userLoggedIn = false;
        return true;
    }
}
