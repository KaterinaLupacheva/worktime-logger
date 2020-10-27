import { useState } from "react";
import "./App.css";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { DataGrid } from "@material-ui/data-grid";
import {
  numberToHoursAndMins,
  createDaylyTime,
  calculateTotalMonthTime,
  checkTimeSum,
  createTableData,
} from "./utils";

const formStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
};

const textFieldStyle = {
  margin: "20px",
};

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sum, setSum] = useState(0);
  const [rate, setRate] = useState(0);
  const [tableRows, setTableRows] = useState([]);

  const columns = [
    { field: "date", headerName: "Date", width: 300 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "moneyTotal", headerName: "Total Earnings", width: 150 },
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

    setTableRows(createTableData(workingDates, times, rate));
  };

  const getBusinessdays = (dates) => {
    return dates.filter((date) => date.getDay() !== 6 && date.getDay() !== 0);
  };

  return (
    <Container maxWidth="md" style={{ backgroundColor: "#d3f5e7" }}>
      <Paper elevation={5} style={{ padding: "5vh", marginBottom: "3rem" }}>
        <form style={formStyle} noValidate onSubmit={onSubmit}>
          <TextField
            id="date"
            label="Start date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={textFieldStyle}
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
            style={textFieldStyle}
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
            style={textFieldStyle}
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
            style={textFieldStyle}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={textFieldStyle}
          >
            Calculate
          </Button>
        </form>
      </Paper>
      <DataGrid autoHeight pageSize={40} rows={tableRows} columns={columns} />
    </Container>
  );
}

export default App;
