import React, { useState } from "react";
import axios from "../../utils/axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(form);
      const resultLogin = await axios.post("auth/login", form);

      console.log(resultLogin);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleReset = (event) => {
    event.preventDefault();
    console.log("Reset Form");
  };
  return (
    <>
      <div className="text-center container">
        <h1>Login Page</h1>
        <div className="alert alert-primary"></div>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <input type="email" placeholder="Input email" name="email" onChange={handleChangeForm} />
          <br />
          <input
            type="password"
            placeholder="Input Password"
            name="password"
            onChange={handleChangeForm}
          />
          <br />
          <button className="btn btn-outline-primary" type="reset">
            Reset
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
