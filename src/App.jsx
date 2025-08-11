import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Registration from "./pages/Registration"
import Home from "./pages/Home"
import store from "./store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Message from "./pages/Message";

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
  {
    path: "/message" ,
    element : <Message />
  },
  {
    path: "/" ,
    element : <Home />
  },
])

function App() {



  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
