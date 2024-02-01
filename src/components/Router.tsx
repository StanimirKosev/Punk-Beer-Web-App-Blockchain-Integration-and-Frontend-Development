import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
