import { User } from './user';

export class Project {
    id: number;
    name: string;
    description: string;
    admin: User;
    users: User[];
}
