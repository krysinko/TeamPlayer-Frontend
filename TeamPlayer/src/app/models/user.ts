import { Role } from './role';

export class User {
    id?: number;
    username: string;
    login: string;
    email: string;
    description?: string;
    active: boolean;
    password: string;
    roles: Role[];
}
