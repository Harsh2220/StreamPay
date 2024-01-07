export default function getSecondsFromDays(days: number) {
    const currentTimestamp = Date.now() / 1000;

    const DaysInSeconds = days * 24 * 60 * 60;
    const futureTimestamp = currentTimestamp + DaysInSeconds;

    return parseInt(futureTimestamp.toString());
};