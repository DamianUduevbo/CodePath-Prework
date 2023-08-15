import * as React from "react";
import { useRoutes } from "react-router-dom";
import { useEffect, useState } from 'react'
import './App.css'

import ContentCreatorCard, { CreatorProps } from './components/ContentCreatorCard'
import supabase from './client.js'
import CreatorEditor from './components/CreatorEditor';
import Home from './pages/home'
import Edit from './edit/page'
import ViewCreator from "./viewCreator/page";
import ErrorPage from "./error-page/page";

function App() {
  /*
  */
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [

      ],
    },
    {
      path: ":id",
      element: <ViewCreator />,
    },
    {
      path: "edit/:id",
      element: <Edit disableDeleteButton={false} />,
    },
    {
      path: "new",
      element: <Edit disableDeleteButton={true} />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },

  ]);

  return (
    <>
      <header>
        <h1>CREATORVERSE</h1>
        <nav>
          <ul>
            <li>
              <a href="/" role="button">VIEW ALL CREATORS</a>
            </li>
            <li>
              <a href="/new" role="button">ADD CREATOR</a>
            </li>
          </ul>
        </nav>
      </header>
      {element}
    </>
  );
}

export default App