import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppPages} from "../../models/app-pages";
import {Location} from "@angular/common";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  title: string;

  constructor(private appPages: AppPages, private location: Location) {
  }

  ngOnInit() {
    this.title = this.appPages.getPageDetails(this.location.path()).title;
  }

}
