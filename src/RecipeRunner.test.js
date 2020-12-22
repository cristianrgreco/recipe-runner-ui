import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import RecipeRunner from "./RecipeRunner";

jest.useFakeTimers();

const createRecipe = (method) => ({
  name: "Name",
  image: "https://recipe-runner-uploads.s3.eu-west-2.amazonaws.com/c329a320-fd8e-11e9-a1a0-dd49d5491a41.jpeg",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  createdBy: "user@domain.com",
  duration: 60000,
  serves: 4,
  equipment: ["Equipment item 1", "Equipment item 2"],
  ingredients: ["Ingredient 1", "Ingredient 2"],
  method,
});

let container;
let dateNowSpy;

beforeAll(() => {
  window.M = { toast: () => {} };
  HTMLMediaElement.prototype.play = () => {};
  dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => new Date("2020-01-01T00:00:00.000Z"));
});

afterAll(() => {
  dateNowSpy.mockRestore();
});

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it("should render a step with no alarm", () => {
  const recipe = createRecipe([
    {
      instruction: "Instruction 1",
      next: [],
    },
  ]);

  act(() => {
    render(<RecipeRunner recipe={recipe} />, container);
  });

  expect(container.querySelector("[data-qa]").getAttribute("data-qa")).toBe("no-alarm-and-in-progress");
});

it("should render the next step", () => {
  const recipe = createRecipe([
    {
      instruction: "Instruction 1",
      next: [
        {
          instruction: "Instruction 1.1",
          next: [],
        },
      ],
    },
  ]);

  act(() => {
    render(<RecipeRunner recipe={recipe} />, container);
  });

  expect(container.textContent).toContain("Instruction 1.1");
});

it("should render a completed step with no alarm", () => {
  const recipe = createRecipe([
    {
      instruction: "Instruction 1",
      next: [],
    },
  ]);
  act(() => {
    render(<RecipeRunner recipe={recipe} />, container);
  });

  act(() => {
    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelector("[data-qa]").getAttribute("data-qa")).toBe("no-alarm-and-complete");
});

it("should render a step with an alarm", () => {
  const recipe = createRecipe([
    {
      instruction: "Instruction 1",
      alarm: {
        duration: 10,
        durationUnit: "minutes",
      },
      next: [],
    },
  ]);

  act(() => {
    render(<RecipeRunner recipe={recipe} />, container);
  });

  expect(container.querySelector("[data-qa]").getAttribute("data-qa")).toBe("alarm-and-ready");
});

it("should render a step with an alarm in progress", async () => {
  const recipe = createRecipe([
    {
      instruction: "Instruction 1",
      alarm: {
        duration: 10,
        durationUnit: "minutes",
      },
      next: [],
    },
  ]);
  act(() => {
    render(<RecipeRunner recipe={recipe} />, container);
  });

  await act(async () => {
    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelector("[data-qa]").getAttribute("data-qa")).toBe("alarm-and-in-progress");
  expect(container.textContent).toContain("10m");
});

it("should render a completed step with an alarm", async () => {
  const recipe = createRecipe([
    {
      instruction: "Instruction 1",
      alarm: {
        duration: 10,
        durationUnit: "minutes",
      },
      next: [],
    },
  ]);
  act(() => {
    render(<RecipeRunner recipe={recipe} />, container);
  });

  await act(async () => {
    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => {
    dateNowSpy.mockImplementation(() => "2020-01-01T00:10:00.000Z");
    jest.advanceTimersByTime(1000);
  });

  expect(container.querySelector("[data-qa]").getAttribute("data-qa")).toBe("alarm-and-complete");
});

it("should render a step with a paused alarm", async () => {
  const recipe = createRecipe([
    {
      instruction: "Instruction 1",
      alarm: {
        duration: 10,
        durationUnit: "minutes",
      },
      next: [],
    },
  ]);
  act(() => {
    render(<RecipeRunner recipe={recipe} />, container);
  });
  await act(async () => {
    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  await act(async () => {
    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelector("[data-qa]").getAttribute("data-qa")).toBe("alarm-and-paused");
  expect(container.textContent).toContain("10m");
});

it("should not advance timer when paused", async () => {
  const recipe = createRecipe([
    {
      instruction: "Instruction 1",
      alarm: {
        duration: 10,
        durationUnit: "minutes",
      },
      next: [],
    },
  ]);
  act(() => {
    render(<RecipeRunner recipe={recipe} />, container);
  });
  await act(async () => {
    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await act(async () => {
    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => {
    dateNowSpy.mockImplementation(() => "2020-01-01T00:10:00.000Z");
    jest.advanceTimersByTime(1000);
  });
  await act(async () => {
    document.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelector("[data-qa]").getAttribute("data-qa")).toBe("alarm-and-in-progress");
  expect(container.textContent).toContain("10m");
});
