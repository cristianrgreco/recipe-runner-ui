import {methodDuration} from "./duration";

describe('duration', () => {

    it('should return zero when recipe has no steps', () => {
        const method = [];

        expect(methodDuration(method)).toBe(0);
    });

    it('should return zero when recipe has multiple steps with no alarms', () => {
        const method = [{next: []}];

        expect(methodDuration(method)).toBe(0);
    });

    it('should return duration of recipe when one step', () => {
        const method = [{alarm: {duration: 10000}}];

        expect(methodDuration(method)).toBe(10000);
    });

    it('should return highest duration in path', () => {
        const method = [
            {alarm: {duration: 5000}},
            {alarm: {duration: 10000}},
        ];

        expect(methodDuration(method)).toBe(10000);
    });

    it('should return highest duration in path with two layers', () => {
        const method = [{
            alarm: {duration: 5000},
            next: [{
                alarm: {duration: 1000}
            }]
        }, {
            alarm: {duration: 5000},
            next: [{
                alarm: {duration: 2000}
            }]
        }];

        expect(methodDuration(method)).toBe(7000);
    });
});
