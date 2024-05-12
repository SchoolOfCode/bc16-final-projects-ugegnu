import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./routes/homePage/homePage";
import CreateRoutePage from "./routes/createRoutePage/createRoutePage";
import SavedRoutesPage from "./routes/savedRoutesPage/savedRoutes";
import RetrievedRoutePage from "./routes/retrievedRoutePage/retrievedRoutePage";
import { Suspense } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "create-route",
    element: <CreateRoutePage />,
  },
  {
    path: "saved-routes",
    element: (
      <Suspense fallback={<p>Loaading..</p>}>
        <SavedRoutesPage />,
      </Suspense>
    ),
  },
  {
    path: "retrieved-route",
    element: <RetrievedRoutePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
