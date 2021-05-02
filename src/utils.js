export const numberToHoursAndMins = (number) => {
  const hours = Math.trunc(number);
  const mins = Math.round(((number - Math.floor(number)) * 60) / 10) * 10;
  return { hours, mins };
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
      const newTimeNumber = hoursAndMinsToNumber(
        newArr[randomIndex].hours,
        newArr[randomIndex].mins + 10
      );
      const newTime = numberToHoursAndMins(newTimeNumber);
      newArr[randomIndex] = {
        ...newArr[randomIndex],
        ...newTime,
      };
      time = calculateTotalMonthTime(newArr);
    }
  }
  return newArr;
};

const getRandomElement = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const createTableData = (dates, times, rate) => {
  let result = [];
  let id = 0;
  let weekStartIdx = 0;
  for (let i = 0; i < dates.length; i++) {
    result.push({
      id: id,
      date: dates[i].toDateString(),
      time: `${times[i].hours} h, ${times[i].mins} min`,
    });
    id++;

    //total row for week
    if (dates[i].getDay() === 5) {
      result.push(createTotalRow(weekStartIdx, times, id, rate, i));
      result.push({
        id: "",
        date: "",
        time: "",
      });
      weekStartIdx = i + 1;
      id++;
    }

    //total row for the last week
    if (i === dates.length - 1 && dates[i].getDay() !== 5) {
      result.push(createTotalRow(weekStartIdx, times, id, rate, i));
      id++;
    }
  }
  const totalTime = numberToHoursAndMins(calculateTotalMonthTime(times));
  result.push({
    id: id,
    date: "Total",
    time: `${totalTime.hours} h, ${totalTime.mins} min`,
    moneyTotal: Math.round(calculateTotalMonthTime(times) * rate),
  });
  return result;
};

const createTotalRow = (weekStartIdx, times, id, rate, i) => {
  const timesCopy = [...times];
  const weekTimeNumber = calculateTotalMonthTime(
    timesCopy.slice(weekStartIdx, i + 1)
  );
  const totalWeekTime = numberToHoursAndMins(weekTimeNumber);
  return {
    id: id,
    date: "Week total",
    time: `${totalWeekTime.hours} h, ${totalWeekTime.mins} min`,
    moneyTotal: Math.round(weekTimeNumber * rate),
  };
};
