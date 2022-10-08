import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Single from "./pages/Single";
import './style.scss';
import MainLayout from "./layouts/main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/post/:id",
                element: <Single />
            },
            {
                path: "/write",
                element: <Write />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

function App() {
  return (
    <div className="app">
      <div className="container">
          <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
