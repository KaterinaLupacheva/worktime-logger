import * as utils from "../utils";

test("Converts number to hours and minutes", () => {
  expect(utils.numberToHoursAndMins(1.5)).toEqual({ hours: 1, mins: 30 });
});

test("Converts hours and mins to number", () => {
  expect(utils.hoursAndMinsToNumber(1, 30)).toBe(1.5);
});

test("Creates array with the same time for each day", () => {
  expect(utils.createDaylyTime({ hours: 1, mins: 30 }, 5)).toEqual([
    { hours: 1, mins: 30 },
    { hours: 1, mins: 30 },
    { hours: 1, mins: 30 },
    { hours: 1, mins: 30 },
    { hours: 1, mins: 30 },
  ]);
});

test("Calculates total month time", () => {
  expect(
    utils.calculateTotalMonthTime([
      { hours: 1, mins: 30 },
      { hours: 1, mins: 30 },
      { hours: 1, mins: 30 },
      { hours: 1, mins: 30 },
      { hours: 1, mins: 30 },
    ])
  ).toBe(7.5);
});
