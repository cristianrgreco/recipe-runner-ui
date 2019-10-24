export const formatTime = ms => {
    if (ms <= 0) {
        return "0";
    }

    const seconds = ms / 1000;
    const minutes = Math.floor(seconds / 60);

    if (minutes > 0) {
        const remainingSeconds = seconds - minutes * 60;

        if (remainingSeconds > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${minutes}m`;
        }

    } else {
        return `${seconds}s`
    }
};
