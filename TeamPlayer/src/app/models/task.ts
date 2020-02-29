export class Task {
    id: number;
    title: string;
    content: string;
    deadline: Date;
    status: StatusModel;
}

export enum StatusModel {
    TODO = 'todo',
    PREPARATION = 'preparation ongoing',
    EXECUTION = 'execution ongoing',
    BLOCKED = 'blocked',
    DONE = 'done'
}