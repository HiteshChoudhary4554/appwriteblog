import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  AddPost,
  AuthLayout,
  Home,
  Signin,
  Signup,
} from "./components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import Post from "./components/Post.jsx";
import Edit from "./components/Edit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signin",
        element: (
          <AuthLayout authentication={false}>
            <Signin />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element:( 
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element:(
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:id",
        element:(
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      },
      {
        path: "/post/edit/:id",
        element:(
          <AuthLayout authentication>
            <Edit />
          </AuthLayout>
        )
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
