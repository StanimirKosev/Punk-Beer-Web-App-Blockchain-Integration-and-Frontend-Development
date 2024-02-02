import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./components/Router.tsx";

export const API_ROOT = "https://api.punkapi.com/v2/beers";
export const PER_PAGE_REGEX = /\?per_page=(\d+)/;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
