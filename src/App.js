import "./App.css";
import { Container, Paper, TextField } from "@material-ui/core";

function App() {
  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
    >
      <Paper elevation={5}>
        <form noValidate>
          <TextField
            id="date"
            label="Start date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="End date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </Paper>
    </Container>
  );
}

export default App;
