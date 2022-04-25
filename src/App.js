import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import BasicCounter from "./pages/basic/Counter/classComponent";
import BasicReact from "./pages/basic/React";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Detail from "./pages/detail";
import Order from "./pages/order";
import Payment from "./pages/payment";
import AllMovie from "./pages/allMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="basic/counter" element={<BasicCounter />} />
        <Route path="basic/react" element={<BasicReact />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="detail" element={<Detail />} />
        <Route path="order" element={<Order />} />
        <Route path="Payment" element={<Payment />} />
        <Route path="all" element={<AllMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
