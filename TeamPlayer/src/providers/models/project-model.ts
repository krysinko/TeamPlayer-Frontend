import {Injectable} from '@angular/core';

@Injectable()
export class ProjectModel {
  id: number;
  name: string;
  description: string;
  adminId: string;
}
