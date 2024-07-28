import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";
import Root from "./Root.jsx";
import ErrorPage from "./ErrorPage.jsx";
// import Placeholder from "./Placeholder.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import Account from "./Account.jsx";
import Note from "./Note.jsx";
import NotesAll from "./NotesAll.jsx";
import NoteAdd from "./NoteAdd.jsx";
import NotesArchived from "./NotesArchived.jsx";
import NotesDeleted from "./NotesDeleted.jsx";
import Categories from "./Categories.jsx";
import CategoryAdd from "./CategoryAdd.jsx";
import Category from "./Category.jsx";
import HomeGuest from "./HomeGuest.jsx";
import { AppContext } from "./Root.jsx";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/login",
          element: <HomeGuest />,
          children: [
            {
              index: true,
              element: <Login />,
            },
            {
              path: "signup",
              element: <Signup />,
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/notes",
              element: <NotesAll />,
            },
            {
              path: "/notes/add",
              element: <NoteAdd />,
            },
            {
              path: "/notes/deleted",
              element: <NotesDeleted />,
            },
            {
              path: "/notes/archived",
              element: <NotesArchived />,
            },
            {
              path: "/notes/:id",
              element: <Note />,
            },
            {
              path: "/categories",
              element: <Categories />,
            },
            {
              path: "/categories/add",
              element: <CategoryAdd />,
            },
            {
              path: "/categories/:id",
              element: <Category />,
            },
            {
              path: "/account",
              element: <Account />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

const ProtectedRoute = () => {
  const { user } = useContext(AppContext);
  const isAuthenticated = user;
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default Router;
