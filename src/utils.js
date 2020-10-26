export const numberToHoursAndMins = (number) => {
  const hours = Math.trunc(number);
  const mins = Math.round(((number - Math.floor(number)) * 60) / 10) * 10;
  return { hours, mins };
};

export const hoursAndMinsToTotalTime = (hours, mins, days) => {
  const totalMins = mins * days;
  const minsToHours = Math.floor(totalMins / 60);
  const restMins = totalMins - minsToHours * 60;
  const totalHours = hours * days + minsToHours;
  return totalHours + restMins / 60;
};

export const hoursAndMinsToNumber = (hours, mins) => {
  return hours + mins / 60;
};

export const createDaylyTime = (time, days) => {
  let arr = [];
  for (let i = 0; i < days; i++) {
    arr.push(time);
  }
  return arr;
};

export const calculateTotalMonthTime = (arr) => {
  let totalTime = 0;
  arr.forEach((el) => (totalTime += hoursAndMinsToNumber(el.hours, el.mins)));
  return totalTime;
};
