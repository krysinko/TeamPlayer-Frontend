import { User } from './user';
import { Project } from './project';
import { NoteChecklist } from './note-types';

export class Note {
    id: number;
    name: string;
    content: NoteChecklist[];
    project: Project; // rethink, loop risk
    assignees: User[];
    poster: User;
    status: PostStatus;
    project_id: Project;
}

export enum PostStatus {
    CHECKLIST = 'CHECKLIST',
    PLAINTEXT = 'PLAINTEXT'
}