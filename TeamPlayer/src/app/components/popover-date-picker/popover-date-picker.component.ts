import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { daynames } from '../../models/task';

@Component({
  selector: 'app-popover-date-picker',
  templateUrl: './popover-date-picker.component.html',
  styleUrls: ['./popover-date-picker.component.scss'],
})
export class PopoverDatePickerComponent implements OnInit {

  @Input() date: Date = new Date();
  displayDate: string;
  displayTime: string;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  getDate(): string {
    const dateOptions: object = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return daynames[this.date.getDay()] + ', ' + this.date.toLocaleString('pl-PL', dateOptions);
  }

  getTime(): string {
    return String(this.date.getHours()) + ':' + String(this.date.getMinutes() > 9 ? this.date.getMinutes() : '0' + this.date.getMinutes());
  }

}
