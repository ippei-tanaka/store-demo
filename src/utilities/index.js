export const constructLogMessage = (message) => `[LOG] ${message}`;

export const log = (message) => console.log(constructLogMessage(message));