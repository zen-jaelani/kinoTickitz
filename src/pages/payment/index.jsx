import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import styles from "./payment.module.css";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const result = await axios.get(`user/${localStorage.getItem("id")}`);
      //   console.log(result.data.data);
      setUser(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(state);

  const data = {
    userId: user.id,
    scheduleId: state.schedule,
    dateBooking: state.date,
    timeBooking: state.time,
    paymentMethod: null,
    totalPayment: state.total,
    seat: state.seat
  };

  console.log(data);

  async function payOrder() {
    try {
      const result = await axios.post(`booking/`, data);
      console.log(result.data.data);
      window.open(result.data.data.redirectUrl, "_blank");
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <Header></Header>
      <div className={`container-fluid bg-white ${styles.rounder} shadow`}>
        <div className="container w-100 d-flex justify-content-between d-lg-none">
          <p className="text-secondary fs-5">Total Payment</p>
          <p className="fs-4">
            {state.total
              ? state.total.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR"
                })
              : 0}
          </p>
        </div>
      </div>

      <main className="container-fluid" id="working" style={{ backgroundColor: "#f5f6f8" }}>
        <div className="container row d-flex d-lg-block py-5 mx-auto">
          <div className="col-lg-8 float-start mb-lg-5">
            <section className="d-block d-lg-block mb-4">
              <h6>Payment Info</h6>
              <div className="card">
                <div className="card-body d-flex px-3 px-lg-5">
                  <ul className="list-group list-group-flush w-100">
                    <li className="list-group-item d-flex justify-content-between">
                      <p className="text-secondary m-0">Date & time</p>
                      <p className="m-0">
                        {" "}
                        {new Date(state.date).toDateString()} at {state.time}{" "}
                      </p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <p className="text-secondary m-0">Movie title</p>
                      <p className="m-0">{state.movie} </p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <p className="text-secondary m-0">Cinema name</p>
                      <p className="m-0">{state.cinemaName}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <p className="text-secondary m-0">Number of tickets</p>
                      <p className="m-0">{state.seat.length} pieces</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <p className="text-secondary m-0">Total payment</p>
                      <p className="m-0 fs-5">
                        {state.total
                          ? state.total.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR"
                            })
                          : 0}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="d-none">
              <h6>Payment Method</h6>
              <div className="card py-4">
                <div className={`card-body py-3 row mx-auto ${styles.paymentCard} ps-5`}>
                  <div className="col">
                    <button className="btn w-75 border">
                      <img src={require("../../assets/image/logos_google-pay.png")} alt="" />
                    </button>
                  </div>

                  <div className="col">
                    <button className="btn w-75 border">
                      <img src={require("../../assets/image/logos_visa.png")} alt="" />
                    </button>
                  </div>

                  <div className="col">
                    <button className="btn w-75 border">
                      <img
                        src={require("../../assets/image/Logo GoPay (SVG-240p) - FileVector69 1.png")}
                        alt=""
                      />
                    </button>
                  </div>

                  <div className="col">
                    <button className="btn w-75 border">
                      <img src={require("../../assets/image/logos_paypal.png")} alt="" />
                    </button>
                  </div>

                  <div className="col">
                    <button className="btn w-75 border">
                      <img src={require("../../assets/image/OVO.png")} alt="" />
                    </button>
                  </div>

                  <div className="col">
                    <button className="btn w-75 border">
                      <img
                        src={require("../../assets/image/Logo DANA (PNG-240p) - FileVector69 1.png")}
                        alt=""
                      />
                    </button>
                  </div>

                  <div className="col">
                    <button className="btn w-75 border">
                      <img
                        src={require("../../assets/image/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.png")}
                        alt=""
                      />
                    </button>
                  </div>

                  <div className="col">
                    <button className="btn w-75 border">
                      <img
                        src={require("../../assets/image/Bank BCA Logo (SVG-240p) - FileVector69 1.png")}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <div className={`${styles.hrText} text-muted`}>or</div>
                <p className="text-center pt-4">
                  Pay via cash. <a className="main-text">See how it work</a>
                </p>
              </div>
            </section>
          </div>

          <div className="col-lg-4 float-lg-end" id="order-info">
            <aside className="my-5 mt-lg-0">
              <h6>Order Info</h6>
              <div className="card">
                <div className="card-body mx-auto mt-4 mt-lg-0">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        value={user.firstName + " " + user.lastName}
                        disabled
                        type="text"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input value={user.email} disabled type="email" className="form-control" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text bg-white" id="basic-addon1">
                          +62
                        </span>
                        <input
                          value={user.noTelp}
                          disabled
                          type="tel"
                          className="form-control"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                    </div>

                    <div
                      className="d-none btn bg-warning bg-opacity-25 d-block w-100 text-center text-secondary pt-1 pt-lg-0 fs-5 my-4"
                      style={{ height: "50px" }}
                    >
                      <i className="bi bi-exclamation-triangle-fill text-warning fs-3 pe-3"></i>
                      Fill your data correctly
                    </div>
                  </form>
                </div>
              </div>
            </aside>
          </div>

          <section
            className={`d-flex justify-content-between mt-4 col-lg-8 ${styles.bottomButton}`}
          >
            <button
              className={`btn btn-lg shadow ${styles.mainText} d-none d-lg-inline fs-5`}
              onClick={() => navigate(-1)}
            >
              Previous step
            </button>
            <button className={`btn btn-lg shadow fs-5 ${styles.mainBg}`} onClick={payOrder}>
              Pay your order
            </button>
          </section>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Payment;
