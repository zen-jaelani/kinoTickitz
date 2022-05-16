import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axios";
import styles from "./auth.module.css";
import Banner from "../../components/banner";
import { login } from "../../stores/action/auth";
import { useDispatch } from "react-redux";

function Login() {
  useEffect(() => {
    document.body.classList.add(styles.body);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    console.log(event.target.value, event.target.name);
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const resultUser = await axios.post(`auth/login`, form);
      console.log(resultUser);
      setMessage("");
      dispatch(login(form))
        .then((res) => {
          console.log("login success");
          navigate("/");
          location.reload();
        })
        .catch((err) => alert(err));
      localStorage.setItem("token", resultUser.data.data.token);
      localStorage.setItem("refreshToken", resultUser.data.data.refreshToken);
      localStorage.setItem(
        "dataUser",
        JSON.stringify({ id: resultUser.data.data.id, role: "admin" })
      );
      localStorage.setItem("id", resultUser.data.data.id);
    } catch (error) {
      console.log(error.response, error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };
  const handleReset = (event) => {
    event.preventDefault();
    console.log("Reset Form");
  };
  return (
    <>
      <main className={styles.main}>
        <Banner />

        <form
          className={styles.form}
          style={{ marginTop: 14 + "em", height: 100 + "%" }}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          {isError && <div className="alert alert-danger">{message}</div>}
          <img src={require("../../assets/image/Tickitz 1.png")} alt="" />
          <h1>Sign In</h1>
          <p>Sign in with your data that you entered during your registration</p>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Write your email"
            onChange={handleChangeForm}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Write your Password"
            onChange={handleChangeForm}
            required
          />
          <button type="submit">Sign In</button>
          <center>
            Don't have an account ? <Link to="/auth/register">Sign Up</Link>
          </center>
        </form>
      </main>
    </>
  );
}

export default Login;
