import { createBrowserRouter } from "react-router-dom";
import SignIn from "@root/scenes/SignIn";
import SignUp from "@root/scenes/SignUp";
import ProjectList from "@root/scenes/ProjectList";
import Home from "@root/scenes/Home";
import ProjectCreation from "@root/scenes/ProjectCreation";
import Project from "@root/scenes/Project";
import UserProfile from "../scenes/UserProfile";

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
  { path: "/user", element: <UserProfile /> },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/projects-creation",
    element: <ProjectCreation />,
  },
  {
    path: "/projects/:projectId",
    element: <Project />,
  },
]);

export default router;
