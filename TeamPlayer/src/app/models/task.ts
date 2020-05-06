import { User } from './user';
import { Project } from './project';

export class TaskDetails {
    title: string;
    content?: string;
    deadline?: Date | string;
    status?: TaskStatus;
    createdAt: Date | string;
    creator?: User | any;
    project?: Project | any;
}

export class Task extends TaskDetails {
    id: number;
    assignees?: User[];
}

export enum TaskStatus {
    PREPARATION = 'preparation ongoing',
    TODO = 'todo',
    EXECUTION = 'execution ongoing',
    BLOCKED = 'blocked',
    DONE = 'done'
}

export const TaskProgressInStartToEndOrder = ['PREPARATION', 'TODO', 'EXECUTION', 'BLOCKED', 'DONE'];

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
        order: 'asc',
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
