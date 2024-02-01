import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Grid from "./components/Grid";

function App() {
  return (
    <ErrorBoundary>
      <Grid />
    </ErrorBoundary>
  );
}

export default App;
