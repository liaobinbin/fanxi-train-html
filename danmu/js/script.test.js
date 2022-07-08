const script = require("./script");

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
  toBeColorString(received) {
    const pass = received.length == 7 && received.startsWith("#");
    if (pass) {
      return {
        message: () => `expected ${received} is color string`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} not is color string`,
        pass: false,
      };
    }
  },
});

test("random 0 - 100", () => {
  expect(script.random(0, 100)).toBeWithinRange(0, 100);
});

test("random color", () => {
  expect(script.randomColor()).toBeColorString();
});
