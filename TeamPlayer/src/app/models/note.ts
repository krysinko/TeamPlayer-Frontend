import { User } from './user';
import { Project } from './project';

export class Note {
    id: number;
    name: string;
    content: string;
    project: Project; // rethink, loop risk
    assignees: User[];
    poster: User;
    status: PostStatus;
    project_id: Project;
}

export enum PostStatus {
    CHECKLIST,
    PLAINTEXT
}
