import moment from "moment";

const formatDuration = (duration) => {
  const hours = duration.get("hours");
  const minutes = duration.get("minutes");
  const seconds = duration.get("seconds");

  const formattedTimeParts = [];

  if (hours !== 0) {
    formattedTimeParts.push(`${hours}h`);
  }
  if (minutes !== 0) {
    formattedTimeParts.push(`${minutes}m`);
  }
  if (seconds !== 0) {
    formattedTimeParts.push(`${seconds}s`);
  }

  if (formattedTimeParts.length === 0) {
    return "0s";
  } else {
    return formattedTimeParts.join(" ");
  }
};

export const formatTime = (ms) => {
  if (ms <= 0) {
    return "0s";
  }

  return formatDuration(moment.utc(moment.duration(ms).as("milliseconds")));
};

export const timeRemaining = (start, end) => {
  return formatDuration(moment.duration(end.diff(start)));
};
