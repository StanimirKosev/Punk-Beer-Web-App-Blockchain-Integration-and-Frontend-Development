import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./components/Router.tsx";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const API_ROOT = "https://api.punkapi.com/v2/beers";
export const PER_PAGE_REGEX = /\?per_page=(\d+)/;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
