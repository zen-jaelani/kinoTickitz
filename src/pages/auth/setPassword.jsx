import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import styles from "./auth.module.css";
import Banner from "../../components/banner";
import { login } from "../../stores/action/auth";
import { useDispatch } from "react-redux";

function SetPassword() {
  const { state } = useLocation();

  useEffect(() => {
    document.body.classList.add(styles.body);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: state.email,
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(form);
      await axios.post("auth/setPassword", form);
      navigate("/auth/login");
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
          style={{ marginTop: 10 + "em", height: 100 + "%" }}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <img src={require("../../assets/image/Tickitz 1.png")} alt="" />
          <h1>Set Password</h1>
          <p>set your new password</p>
          <label>Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Write your password"
            onChange={handleChangeForm}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Write your confirm password"
            onChange={handleChangeForm}
            required
          />
          {isError && <div className="alert alert-danger">{message}</div>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

export default SetPassword;
