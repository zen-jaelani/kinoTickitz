import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicCounter from "./pages/basic/Counter/classComponent";
import BasicReact from "./pages/basic/React";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="basic/counter" element={<BasicCounter />} />
        <Route path="basic/react" element={<BasicReact />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
