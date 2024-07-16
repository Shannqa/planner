import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
