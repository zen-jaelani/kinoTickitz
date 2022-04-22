import React, { useEffect } from "react";
import styles from "./register.module.css";

function register() {
  console.clear();

  useEffect(() => {
    document.body.classList.add(styles.body);
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.banner}>
          <div className={styles.bannerOverlay}>
            <img src={require("../../assets/image/signLogo.png")} alt="" className={styles.logo} />
            <h3 className={styles.subtitle}>wait, watch, wow!</h3>
          </div>
          <img src={require("../../assets/image/image 1.png")} alt="" />
        </div>

        <div className={styles.form}>
          <img src="../assets/image/Tickitz 1.png" alt="" />
          <h1>Sign Up</h1>
          <p>Fill your additional details</p>

          <label>First Name</label>
          <input type="text" placeholder="Write your first name" />

          <label>Last Name</label>
          <input type="text" placeholder="Write your last name" />

          <label>Phone Number</label>
          <input type="tel" minLength="9" maxLength="14" placeholder="Write your phone number" />

          <label>Email</label>
          <input type="email" placeholder="Write your email" />

          <label>Password</label>
          <input type="password" placeholder="Write your Password" />

          <button type="submit">Sign Up</button>

          <center>
            Already have account ? <a href="signin.html">Sign In</a>
          </center>
        </div>
      </main>
    </>
  );
}

export default register;
