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
  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildRegisterForm();
  }

  doRegister() {
    this.userService.register({});
    this.userService.logIn();
  }

  buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmed: ['', Validators.required],
    });
  }

}