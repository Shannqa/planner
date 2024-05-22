import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Root from "./Root.jsx";
import ErrorPage from "./ErrorPage.jsx";
// import Placeholder from "./Placeholder.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Account from "./Account.jsx";
import Todos from "./Todos.jsx";
import Projects from "./Projects.jsx";
import ProjectAdd from "./ProjectAdd.jsx";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/todos",
          element: <Todos />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/project",
          element: <ProjectAdd />,
        },
        {
          path: "/account",
          element: <Account />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
