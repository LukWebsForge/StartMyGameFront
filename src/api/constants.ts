enum ServerStatus {
    ACTIVE = 'active',
    STARTUP = 'startup',
    STARTUP_ERROR = 'startup_error',
    OFF = 'off',
}

enum StartStatus {
    CREATING = 'creating',
    STARTING = 'starting',
    IN_STARTUP = 'in_startup',
    ALREADY_RUNNING = 'already_running',
}

export {ServerStatus, StartStatus};
