export const methodDuration = method => {
    const durations = pathDurations(method, []);

    if (durations.length === 0) {
        return 0;
    }

    return Math.max(...durations);
};

function pathDurations(method, durations) {
    if (method.length === 0) {
        return durations;
    }

    return method.map(step => {
        const nextStep = step.next || [];
        const nextDurations = step.alarm ? [...durations, step.alarm.duration] : [...durations];

        const durationsForStepPath = pathDurations(nextStep, nextDurations);
        const sumOfDurationsForStepPath = durationsForStepPath.reduce((a, b) => a + b, 0);

        return sumOfDurationsForStepPath;
    });
}
