export function getSecondsFromDays(days: number) {
    const currentTimestamp = Date.now() / 1000;

    const daysInSeconds = days * 24 * 60 * 60;
    const futureTimestamp = currentTimestamp + daysInSeconds;

    return parseInt(futureTimestamp.toString());
};

export function getSecondsFromHours(hours: number) {
    const currentTimestamp = Date.now() / 1000;

    const hoursInSeconds = hours * 60 * 60;
    const futureTimestamp = currentTimestamp + hoursInSeconds;

    return parseInt(futureTimestamp.toString());
};

export function getSecondsFromMinutes(minutes: number) {
    const currentTimestamp = Date.now() / 1000;

    const minutesInSeconds = minutes * 60;
    const futureTimestamp = currentTimestamp + minutesInSeconds;

    return parseInt(futureTimestamp.toString());
};

export function getSeconds(seconds: number) {
    const currentTimestamp = Date.now() / 1000;

    const futureTimestamp = currentTimestamp + seconds;

    return parseInt(futureTimestamp.toString());
};