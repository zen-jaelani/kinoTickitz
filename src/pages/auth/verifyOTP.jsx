import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import styles from "./auth.module.css";
import Banner from "../../components/banner";
import { login } from "../../stores/action/auth";
import { useDispatch } from "react-redux";
import Pin from "react-pin-field";

function VerifyOTP() {
  const [pin, setPin] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    document.body.classList.add(styles.body);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await axios.post("auth/verifyOTP", { OTP: pin, email: state.email });
      navigate("/auth/setpass", { state: { email: state.email } });
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
          <p>Please input OTP code below</p>
          <div className="mb-5 mt-5 d-flex flex-row">
            <Pin
              className={`btn btn-lg border text-black mx-1  ${
                pin.length == 6 ? "border-primary" : ""
              }`}
              style={{ width: "3em" }}
              length={6}
              validate="0123456789"
              inputMode="numeric"
              onChange={(code) => setPin(code)}
              autoFocus
            ></Pin>
          </div>
          {isError && <div className="alert alert-danger">{message}</div>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

export default VerifyOTP;
