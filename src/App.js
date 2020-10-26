import { useState, useEffect } from "react";
import "./App.css";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import {
  numberToHoursAndMins,
  createDaylyTime,
  calculateTotalMonthTime,
  checkTimeSum,
  createTableData,
} from "./utils";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sum, setSum] = useState(0);
  const [rate, setRate] = useState(0);
  const [finalTimeArr, setFinalTimeArr] = useState([]);

  const columns: ColDef[] = [
    { field: "col1", headerName: "Date", width: 150 },
    { field: "col2", headerName: "Time", width: 150 },
  ];

  const rows: RowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "XGrid", col2: "is Awesome" },
    { id: 3, col1: "Material-UI", col2: "is Amazing" },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    const days =
      differenceInBusinessDays(new Date(endDate), new Date(startDate)) + 1;
    const timeToLog = sum / rate;
    const hoursPerDay = timeToLog / days;
    const hoursAndMinsPerDay = numberToHoursAndMins(hoursPerDay);
    const timeArray = createDaylyTime(hoursAndMinsPerDay, days);
    const totalTime = calculateTotalMonthTime(timeArray);

    const times = checkTimeSum(timeToLog, totalTime, timeArray);

    const dates = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });
    const workingDates = getBusinessdays(dates);
    console.log(createTableData(workingDates, times));
  };

  const getBusinessdays = (dates) => {
    return dates.filter((date) => date.getDay() !== 6 && date.getDay() !== 0);
  };

  const createRows = () => {};

  useEffect(() => {
    console.log(finalTimeArr);
  }, [finalTimeArr]);

  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
    >
      <Paper elevation={5}>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            id="date"
            label="Start date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="End date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="filled-number"
            label="Sum"
            type="number"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="filled-number"
            label="Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <Button variant="contained" color="primary" type="submit">
            Calculate
          </Button>
        </form>
      </Paper>
      <DataGrid rows={rows} columns={columns} />
    </Container>
  );
}

export default App;
