import React from "react"
import ReactDOM from "react-dom/client"
import { firebaseApp } from "./firebase.ts"
import App from "./App.tsx"
import ErrorPage from "./errors/ErrorPage.tsx"
import { Login, Root, TextEditor } from "./components"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import { AuthProvider } from "./contexts/AuthContext.tsx"

firebaseApp

const router = createBrowserRouter([
   {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
         {
            index: true,
            element: <App />,
         },
         {
            path: "/login",
            element: <Login />,
         },
         {
            path: "/editor/:id",
            element: <TextEditor />,
         },
      ],
   },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <AuthProvider>
         <RouterProvider router={router} />
      </AuthProvider>
   </React.StrictMode>
)
