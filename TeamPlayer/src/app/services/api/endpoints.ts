import { environment } from '../../../environments/environment';

export const API_URL = environment.apiUrl;

// tasks
export const tasksApiPath = 'tasks/';
export const taskByAsigneePath = 'tasks/assignee/';
export const taskByCreatorPath = 'tasks/creator/';

// users
export const usersApiPath = 'users/';

// meetings
export const meetingsByUserPath = 'meetings/participant/';
export const meetingsByCreatorPath = 'meetings/creator/';
export const meetingsById = 'meetings/';

// project

export const projectApiByIdPath = 'projects/';
export const projectApiByUserIdPath = 'projects/users/';
