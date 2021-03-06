import { User } from './user';

export class Meeting {
    id: number;
    name: string;
    description: string;
    date: Date;
    creator: User;
    participants: User[];
}
