import { FC, ReactNode } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import WalletOptions from "./WalletOptions";
import { useAccount } from "wagmi";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount();
  if (!isConnected) {
    return <Navigate to="/authenticate" replace />;
  }

  return children;
};

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/:dashboardView?",
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/authenticate",
      element: <WalletOptions />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
