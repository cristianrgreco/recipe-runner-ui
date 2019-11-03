import moment from "moment";

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

export const timeRemaining = (start, end) => {
    const duration = moment.duration(end.diff(start));

    const minutes = Math.floor(duration.asMinutes());
    const seconds = Math.floor(duration.asSeconds() % 60);

    if (minutes === 0 && seconds === 0) {
        return '0';
    } else if (minutes < 0 || seconds < 0) {
        return '0';
    } else if (minutes === 0 && seconds > 0) {
        return `${seconds}s`
    } else if (minutes > 0 && seconds === 0) {
        return `${minutes}m`
    } else {
        return `${minutes}m ${seconds}s`
    }
};
