import { methodDuration } from "./duration";

describe("duration", () => {
  it("should return zero when recipe has no steps", () => {
    const method = [];

    expect(methodDuration(method)).toBe(0);
  });

  it("should return zero when recipe has multiple steps with no alarms", () => {
    const method = [{ next: [] }];

    expect(methodDuration(method)).toBe(0);
  });

  it("should return duration of recipe when one step", () => {
    const method = [{ alarm: { duration: 1, durationUnit: "seconds" } }];

    expect(methodDuration(method)).toBe(1000);
  });

  it("should return highest duration in path", () => {
    const method = [
      { alarm: { duration: 1, durationUnit: "seconds" } },
      { alarm: { duration: 2, durationUnit: "seconds" } },
    ];

    expect(methodDuration(method)).toBe(2000);
  });

  it("should return highest duration in path with two layers", () => {
    const method = [
      {
        alarm: { duration: 5, durationUnit: "seconds" },
        next: [
          {
            alarm: { duration: 1, durationUnit: "seconds" },
          },
        ],
      },
      {
        alarm: { duration: 5, durationUnit: "seconds" },
        next: [
          {
            alarm: { duration: 2, durationUnit: "seconds" },
          },
        ],
      },
    ];

    expect(methodDuration(method)).toBe(7000);
  });
});
