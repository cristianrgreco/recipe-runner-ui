import {formatTime} from "./time";

describe('formatTime', () => {

    it('should return zero for zero or negative', () => {
        expect(formatTime(0)).toBe('0');
        expect(formatTime(-1)).toBe('0');
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
