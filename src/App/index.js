import { RouterProvider, BrowserRouter } from "react-router-dom";
import "./style.css";
import router from "./router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
