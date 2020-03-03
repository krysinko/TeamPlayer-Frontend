import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      passwordConfirmed: ['', Validators.required],
    });
  }

  ngOnInit() {}

  doRegister() {
    // this.userService.register({});
    this.userService.logIn();
  }

}
// core.js:6014 ERROR Error: Uncaught (in promise): NullInjectorError: StaticInjectorError(AppModule)[RegisterComponent -> FormBuilder]:
//   StaticInjectorError(Platform: core)[RegisterComponent -> FormBuilder]:
//     NullInjectorError: No provider for FormBuilder!
// NullInjectorError: StaticInjectorError(AppModule)[RegisterComponent -> FormBuilder]:
//   StaticInjectorError(Platform: core)[RegisterComponent -> FormBuilder]:
//     NullInjectorError: No provider for FormBuilder!