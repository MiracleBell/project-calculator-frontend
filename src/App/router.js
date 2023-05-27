import { createBrowserRouter } from "react-router-dom";
import SignIn from "@root/scenes/SignIn";
import SignUp from "@root/scenes/SignUp";
import ProjectList from "@root/scenes/ProjectList";
import Home from "@root/scenes/Home";
import ProjectCreation from "@root/scenes/ProjectCreation";

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
  {
    path: "/projects-creation",
    element: <ProjectCreation />,
  },
]);

export default router;
