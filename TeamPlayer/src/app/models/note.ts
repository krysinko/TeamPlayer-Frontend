import { User } from './user';
import { Project } from './project';

export class Note {
    id: number;
    name: string;
    content: string;
    project_id: Project; // rethink, loop risk
    assignees: User[];
    poster: User;
    status: PostStatus;
}

export enum PostStatus {
    CHECKLIST,
    PLAINTEXT
}
