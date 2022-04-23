import React from "react";
import styles from "./banner.module.css";

function Banner() {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}>
          <img src={require("../../assets/image/signLogo.png")} alt="" className={styles.logo} />
          <h3 className={styles.subtitle}>wait, watch, wow!</h3>
        </div>
        <img src={require("../../assets/image/image 1.png")} alt="" />
      </div>
    </>
  );
}

export default Banner;
