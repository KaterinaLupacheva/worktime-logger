import { useState } from "react";
import "./App.css";
import { Container, Paper, TextField, Button } from "@material-ui/core";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(startDate);
    console.log(endDate);
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
          <Button variant="contained" color="primary" type="submit">
            Calculate
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default App;
