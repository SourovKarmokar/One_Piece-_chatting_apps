import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Registration from "./pages/Registration"
import Home from "./pages/Home"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/registration" ,
    element : <Registration />
  },
  {
    path: "/login" ,
    element : <Login />
  },
  {
    path: "/forgotpassword" ,
    element : <ForgotPassword />
  },
  {
    path: "/" ,
    element : <Home />
  },
])

function App() {



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
