import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Error from "./components/Error";
import CountryDetails from "./components/CountryDetails";

const root = createRoot(document.getElementById('root'))

const router = createBrowserRouter(
  
  [
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
      children:[{
        path: '/',
        element: <Home />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/:country',
        element: <CountryDetails />
      },]
    },
    
  ]
  )


root.render(<RouterProvider router={router} />)