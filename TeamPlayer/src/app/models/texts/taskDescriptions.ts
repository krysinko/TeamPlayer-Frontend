export enum TaskLabels {
    PREPARATION = 'In preparation',
    TODO = 'To do',
    EXECUTION = 'In progress',
    BLOCKED = 'Blocked',
    DONE = 'Done'
}

export const apiErrorMessage: string = 'Service error. Please, try again.';
export const forbiddenErrorMessage: string = 'You don\'t have access to this acton.';
export const unauthorizedErrorMessage: string = 'You don\'t have permissions to do this operation. Please, contact your project administrator instead.';
export const dataNotFoundErrorMessage: string = 'Data not found. Operation failed.';
export const successfulSavedMessage: string = 'Data saved successfully!';
