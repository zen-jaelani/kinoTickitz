import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axios";
import styles from "./auth.module.css";
import Banner from "../../components/banner";
import { login } from "../../stores/action/auth";
import { useDispatch } from "react-redux";

function Reset() {
  useEffect(() => {
    document.body.classList.add(styles.body);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await axios.post("auth/generateOTP", form);
      navigate("/auth/verify", { state: form });
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
          <h1>Forgot Password</h1>
          <p>we'll send a link to your email shortly</p>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Write your email"
            onChange={handleChangeForm}
            required
          />
          {isError && <div className="alert alert-danger">{message}</div>}
          <button type="submit">Send</button>
        </form>
      </main>
    </>
  );
}

export default Reset;
