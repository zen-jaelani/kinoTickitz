import React from "react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start text-black bg-white">
        <section className="pt-2">
          <div className="container text-start text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
                <img src={require("../../assets/image/Tickitz 1.png")} className="pb-4" alt="" />
                <p className={styles.subtitle}>
                  Stop waiting in line. Buy tickets conveniently, watch movies quietly.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-4">
                <h6 className="text-uppercase fw-bold text-black">Explore</h6>
                <hr className={`mb-4 mt-0 d-inline-block mx-auto ${styles.hrStyle}`} />
                <div className="explore d-flex flex-row flex-md-column">
                  <p className="pe-5">Home</p>
                  <p>List Movie</p>
                </div>
              </div>

              <div className="col-md-3 col-lg-2 mx-auto mt-4 mb-4">
                <h6 className="text-uppercase fw-bold">Our Sponsor</h6>
                <hr className={`mb-3 mt-0 d-inline-block mx-auto ${styles.hrStyle}`} />
                <div className="flex-row flex-md-column">
                  <img
                    src={require("../../assets/image/Vector.png")}
                    alt=""
                    className="pt-0 pe-5"
                  />
                  <img
                    src={require("../../assets/image/Vector-1.png")}
                    alt=""
                    className="pe-5 py-md-4"
                  />
                  <img src={require("../../assets/image/Vector-2.png")} alt="" />
                </div>
              </div>

              <div className="col-md-4 col-lg-3 mx-auto mb-md-0 mt-4">
                <h6 className="text-uppercase fw-bold">Social Media</h6>
                <hr className={`mb-4 mt-0 d-inline-block mx-auto ${styles.hrStyle}`} />
                <div className={`flex-column ${styles.sosmed}`}>
                  <p className="d-inline d-md-block pe-3">
                    <i className="bi bi-twitter d-inline"></i>
                    <span className="d-none d-md-inline"> tickitz.id </span>
                  </p>
                  <p className="d-inline d-md-block pe-3">
                    <i className="bi bi-instagram d-inline"></i>
                    <span className="d-none d-md-inline"> tickitz.id </span>
                  </p>
                  <p className="d-inline d-md-block pe-3">
                    <i className="bi bi-facebook d-inline"></i>
                    <span className="d-none d-md-inline"> Tickitz Cinema id </span>
                  </p>
                  <p className="d-inline d-md-block pe-3">
                    <i className="bi bi-youtube d-inline"></i>
                    <span className="d-none d-md-inline"> Tickitz Cinema id </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container text-sm-start text-lg-center py-5">
          <span className={`pt-4 ${styles.subtitle}`}>© 2020 Tickitz. All Rights Reserved.</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
