export const methodDuration = method => {
    const durations = pathDurations(method, []);

    if (durations.length === 0) {
        return 0;
    }

    return Math.max(...durations);
};

const pathDurations = (method, durations) => {
    if (method.length === 0) {
        return durations;
    }

    return method.map(step => {
        const nextStep = step.next || [];
        const nextDurations = step.alarm ? [...durations, durationToMillis(step.alarm.duration, step.alarm.durationUnit) ] : [...durations];

        const durationsForStepPath = pathDurations(nextStep, nextDurations);
        const sumOfDurationsForStepPath = durationsForStepPath.reduce((a, b) => a + b, 0);

        return sumOfDurationsForStepPath;
    });
}

const durationToMillis = (duration, durationUnit) => {
    switch (durationUnit) {
        case 'seconds':
            return duration * 1000;
        case 'minutes':
            return duration * 60000;
        case 'hours':
            return duration * 3.6e+6;
    }
};