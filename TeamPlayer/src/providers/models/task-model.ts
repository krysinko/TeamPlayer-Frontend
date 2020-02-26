import {Injectable} from '@angular/core';
import {DateTime} from "ionic-angular";

@Injectable()
export class TaskModel {
  id: number;
  title: string;
  content: string;
  deadline: DateTime;
  status: StatusModel;
}


export enum StatusModel {
  TODO = 'todo',
  PREPARATION = 'preparation ongoing',
  EXECUTION = 'execution ongoing',
  BLOCKED = 'blocked',
  DONE = 'done'
}
