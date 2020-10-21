import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterData } from '../../models/register-data';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.scss' ],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor(private userService: UserService, private formBuilder: FormBuilder) {
        this.buildRegisterForm();
    }

    ngOnInit() {
        this.buildRegisterForm();
    }

    doRegister() {
        if (!this.registerForm.errors) {
            this.userService.register(this.registerForm.value as RegisterData);
            // this.userService.logIn();
        }
    }

    buildRegisterForm(): void {
        this.registerForm = this.formBuilder.group({
            name: [ '' ],
            email: [ '', [ Validators.required, Validators.email ] ],
            password: [ '', Validators.required ],
            passwordConfirmed: [ '', Validators.required ],
        }, { validator: this.checkIfMatchingPasswords('password', 'passwordConfirmed') });
    }

    checkIfMatchingPasswords(password: string, passwordConfirmed: string) {
        return (group: FormGroup) => {
            const passwordInput = group.controls[password],
                passwordConfirmationInput = group.controls[passwordConfirmed];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true });
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }
}