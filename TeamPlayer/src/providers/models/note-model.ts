import {Injectable} from '@angular/core';

@Injectable()
export class NoteModel {
  id: number;
  name: string;
  content: string;
  projectId: number;
}
