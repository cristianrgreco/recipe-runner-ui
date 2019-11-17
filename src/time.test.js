import {formatTime, timeRemaining} from "./time";
import moment from "moment";

describe('time', () => {

    describe('formatTime', () => {

        it('should return zero for zero or negative', () => {
            expect(formatTime(0)).toBe('0s');
            expect(formatTime(-1)).toBe('0s');
        });

        it('should return secs from ms', () => {
            expect(formatTime(1000)).toBe('1s');
            expect(formatTime(59000)).toBe('59s');
        });

        it('should return mins and secs from ms', () => {
            expect(formatTime(61000)).toBe('1m 1s');
        });

        it('should return mins without secs when secs is zero from ms', () => {
            expect(formatTime(60000)).toBe('1m');
        });
    });

    describe('timeRemaining', () => {

        it('should return zero when time is now', () => {
            const start = moment();
            const end = start.clone();

            expect(timeRemaining(start, end)).toBe('0s')
        });

        it('should return zero when time is in the past', () => {
            const start = moment();
            const end = start.clone().subtract(1, 'd');

            expect(timeRemaining(start, end)).toBe('0s');
        });

        it('should return seconds remaining', () => {
            const start = moment();
            const end = start.clone().add(59, 's');

            expect(timeRemaining(start, end)).toBe('59s');
        });

        it('should return minutes remaining', () => {
            const start = moment();
            const end = start.clone().add(60, 's');

            expect(timeRemaining(start, end)).toBe('1m');
        });

        it('should return minutes and seconds remaining', () => {
            const start = moment();
            const end = start.clone().add(61, 's');

            expect(timeRemaining(start, end)).toBe('1m 1s');
        });
    });
});
