import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Detail from "./pages/detail";
import Order from "./pages/order";
import Payment from "./pages/payment";
import AllMovie from "./pages/allMovie";
import ManageMovie from "./pages/manageMovie/index";
import ManageSchedule from "./pages/manageSchedule/index";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./helpers/route/privateRoute";
import PublicRoute from "./helpers/route/publicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="all" element={<AllMovie />} />
        <Route element={<PublicRoute restricted={true} />}>
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={false} />}>
          <Route path="detail/:id" element={<Detail />} />
          <Route path="order" element={<Order />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="Profile" element={<Profile />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="manage/movie" element={<ManageMovie />} />
          <Route path="manage/schedule" element={<ManageSchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
