import { createBrowserRouter } from "react-router-dom";
import SignIn from "@root/scenes/SignIn";
import SignUp from "@root/scenes/SignUp";
import ProjectList from "@root/scenes/ProjectList";
import Home from "@root/scenes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/projects",
    element: <ProjectList />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
