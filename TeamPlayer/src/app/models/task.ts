class PreviousTaskState {
    updated: Date;
    oldDetails: TaskDetails;
}

export class TaskDetails {
    title?: string;
    content?: string;
    deadline?: Date;
    status?: TaskStatus;
    createdAt: string;
}

export class Task extends TaskDetails {
    id?: number;
    assignedUsers?: number[];
    previousStates?: Array<PreviousTaskState>;
}

export enum TaskStatus {
    PREPARATION = 'preparation ongoing',
    TODO = 'todo',
    EXECUTION = 'execution ongoing',
    BLOCKED = 'blocked',
    DONE = 'done'
}

export const TaskProgressInStartToEndOrder = [TaskStatus.PREPARATION, TaskStatus.TODO, TaskStatus.BLOCKED, TaskStatus.EXECUTION, TaskStatus.DONE ];

export const daynames: string[] = [ 'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota' ];

export class SortOption {
    label: string;
    order: 'asc' | 'desc';
    property: keyof Task;
}

export const TaskSortOptions: SortOption[] = [
    {
        label: 'Nazwa - alfabetycznie, A-Z',
        property: 'title',
        order: 'asc',
    },
    {
        label: 'Nazwa - alfabetycznie, Z-A',
        property: 'title',
        order: 'desc',
    },
    {
        label: 'Data zakończenia - od najbliższej',
        property: 'deadline',
        order: 'desc',
    },
    {
        label: 'Data zakończenia - od najdalszej',
        property: 'deadline',
        order: 'desc',
    },
    {
        label: 'Postęp - najmniejszy',
        property: 'status',
        order: 'asc',
    },
    {
        label: 'Postęp - największy',
        property: 'status',
        order: 'desc',
    },
    {
        label: 'Data utworzenia - od najnowszych',
        property: 'createdAt',
        order: 'asc',
    },
    {
        label: 'Data utworzenia - od najstarszych',
        property: 'createdAt',
        order: 'desc',
    },
];
