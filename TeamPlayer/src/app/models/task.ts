class PreviousTaskState {
    updated: Date;
    oldDetails: TaskDetails;
}

export class TaskDetails {
    title?: string;
    content?: string;
    deadline?: Date;
    status?: TaskStatus;
}

export class Task extends TaskDetails {
    id?: number;
    assignedUsers?: number[];
    previousStates?: Array<PreviousTaskState>;
}

export enum TaskStatus {
    TODO = 'todo',
    PREPARATION = 'preparation ongoing',
    EXECUTION = 'execution ongoing',
    BLOCKED = 'blocked',
    DONE = 'done'
}

export const daynames: string[] = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
