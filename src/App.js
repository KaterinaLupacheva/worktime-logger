import { useState } from "react";
import "./App.css";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sum, setSum] = useState(0);
  const [rate, setRate] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    const days =
      differenceInBusinessDays(new Date(endDate), new Date(startDate)) + 1;
    console.log(days);
    console.log(sum / days);
  };
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
    </Container>
  );
}

export default App;
