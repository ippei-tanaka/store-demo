export const constructLogMessage = (message) => `[LOG] ${message}`;

export const constructErrorMessage = (message) => `[ERROR] ${message}`;

export const log = (message) => console.log(constructLogMessage(message));

export const error = (message) => console.log(constructErrorMessage(message));