import { useParams } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";

function App() {
  const { dashboardView } = useParams<{
    dashboardView: "favorites" | undefined;
  }>();

  return (
    <>
      <Header />
      <ErrorBoundary>{!dashboardView ? <Dashboard /> : null}</ErrorBoundary>
    </>
  );
}

export default App;
