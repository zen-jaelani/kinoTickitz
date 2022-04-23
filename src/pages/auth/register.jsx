import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import axios from "../../utils/axios";
import Banner from "../../components/banner";

function register() {
  useEffect(() => {
    document.body.classList.add(styles.body);
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    noTelp: "",
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
      console.log(form);
      const resultLogin = await axios.post("auth/register", form);

      //   const resultUser = await axios.get(`user/${resultLogin.data.data.id}`);
      console.log(resultLogin);
      setMessage("");
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      //   navigate("/");
    } catch (error) {
      console.log(error.response, error);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <Banner />

        <form className={styles.form} onSubmit={handleSubmit}>
          {isError && <div className="alert alert-danger">{message}</div>}

          <img src={require("../../assets/image/Tickitz 1.png")} alt="" />
          <h1>Sign Up</h1>
          <p>Fill your additional details</p>

          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Write your first name"
            onChange={handleChangeForm}
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Write your last name"
            onChange={handleChangeForm}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="noTelp"
            minLength="9"
            maxLength="14"
            onChange={handleChangeForm}
            placeholder="Write your phone number"
            required
          />

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

          <button type="submit">Sign Up</button>

          <center>
            Already have account ? <Link to="/auth/login">Sign In</Link>
          </center>
        </form>
      </main>
    </>
  );
}

export default register;
