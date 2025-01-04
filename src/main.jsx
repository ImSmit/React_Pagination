import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import Documents from "./screens/Documents.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import Profile from "./screens/Profile.jsx";

import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Sorry You lost your way</h1>,
    children: [
      {path: "/",element: <Dashboard />},
      {path: "/documents",element: <Documents />},
      {path: "/login",element: <Login />},
      {path: "/register",element: <Register />},
      {path: "/profile",element: <Profile />},
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>  
  <RouterProvider router={router} />
  </Provider>
);
