import "./App.css";
import Dashboard from "./components/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    </>
  );
}

export default App;
