import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    public subpage: string;

    constructor(private activatedRoute: ActivatedRoute, private routing: Router) { }

    ngOnInit() {
        this.subpage = this.activatedRoute.snapshot.paramMap.get('id');
    }

    goToLoginPage() {
        this.routing.navigate(['folder/my-profile/login']);
    }

    goToRegisterPage() {
        this.routing.navigate(['folder/my-profile/register']);
    }
}
