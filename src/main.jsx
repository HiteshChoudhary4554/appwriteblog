import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./Index/index.js";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Contactus from "./pages/Contactus.jsx";
import Post from "./pages/Post.jsx";
import EditPost from "./pages/EditPost.jsx";
import { authStore } from "./Store/authStore";
import { Provider } from "react-redux";
import Protected from "./components/AuthLayout.jsx";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route
        path="/"
        element={
          <Protected authentication={false}>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/all-post"
        element={
          <Protected>
            <AllPost />
          </Protected>
        }
      />
      <Route
        path="/add-post"
        element={
          <Protected>
            <AddPost />
          </Protected> 
        } 
      />
      <Route
        path="/signin"
        element={
          <Protected authentication={false}>
            <Signin />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />
      <Route
        path="/contact-us"
        element={
          <Protected authentication={false}>
            <Contactus />
          </Protected>
        }
      />
      <Route
        path="/post/:index/:id"
        element={
          <Protected>
            <Post />
          </Protected>
        }
      />
      <Route
        path="/edit-post/:index"
        element={
          <Protected>
            <EditPost />
          </Protected>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={authStore}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
