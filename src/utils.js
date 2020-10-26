export const numberToHoursAndMins = (number) => {
  const hours = Math.trunc(number);
  const mins = Math.round(((number - Math.floor(number)) * 60) / 10) * 10;
  return { hours, mins };
};

const hoursAndMinsToTotalTime = (hours, mins, days) => {
  const totalMins = mins * days;
  const minsToHours = Math.floor(totalMins / 60);
  const restMins = totalMins - minsToHours * 60;
  const totalHours = hours * days + minsToHours;
  return totalHours + restMins / 60;
};

const hoursAndMinsToNumber = (hours, mins) => {
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

export const checkTimeSum = (timeToLog, calculatedTime, arr) => {
  let time = calculatedTime;
  let newArr = [...arr];
  while (Number(time).toFixed(2) !== Number(timeToLog).toFixed(2)) {
    if (timeToLog < time) {
      let randomIndex = getRandomElement(0, newArr.length - 1);
      newArr[randomIndex] = {
        ...newArr[randomIndex],
        mins: newArr[randomIndex].mins - 10,
      };
      time = calculateTotalMonthTime(newArr);
    } else if (timeToLog > time) {
      let randomIndex = getRandomElement(0, newArr.length - 1);
      newArr[randomIndex] = {
        ...newArr[randomIndex],
        mins: newArr[randomIndex].mins + 10,
      };
      time = calculateTotalMonthTime(newArr);
    }
  }
  return newArr;
};

const getRandomElement = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const createTableData = (dates, times) => {
  let result = [];
  for (let i = 0; i < dates.length; i++) {
    result.push({
      id: i + 1,
      date: dates[i].toDateString(),
      time: `${times[i].hours} h, ${times[i].mins} min`,
    });
  }
  return result;
};
