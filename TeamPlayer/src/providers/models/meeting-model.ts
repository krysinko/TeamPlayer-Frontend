import {Injectable} from '@angular/core';
import {DateTime} from "ionic-angular";

@Injectable()
export class MeetingModel {
  id: number;
  name: string;
  description: string;
  date: DateTime;
}
