import React, { useState, useEffect } from "react";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import styles from "./profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser, changePassword, updateImage, updateProfile } from "../../stores/action/user";
import { getBookingUser, getBooking } from "../../stores/action/booking";
import { QRCodeSVG } from "qrcode.react";

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.data.id);
  const userData = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderDetail, setOrderDetail] = useState({
    name: "spider",
    dateBooking: "",
    timeBooking: "",
    category: "",
    seat: "",
    totalPayment: 0
  });
  const [password, setPassword] = useState({});
  const cinemaIcon = {
    "Ebu.Id": "Vector.png",
    CineOne21: "Vector-1.png",
    hiflix: "Vector-2.png"
  };

  const booking = useSelector((state) => state.booking);
  console.log(booking.data);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      dispatch(getUser(userId))
        .then((res) => {
          setForm(res.value.data.data);
          setImage(res.value.data.data.image);
        })
        .catch((err) => console.log(err));

      dispatch(getBookingUser(userId))
        .then((res) => {
          console.log("success get booking data ");
          setOrderHistory(res.value.data.data);
        })
        .catch((err) => alert(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeForm = (event) => {
    const { name, value, files, type } = event.target;

    if (name === "image") {
      const formData = new FormData();
      formData.append("image", files[0]);

      dispatch(updateImage(formData))
        .then((res) => {
          alert(res.value.data.msg);
          setImage(res.value.data.data.image);
        })
        .catch((err) => alert(err));
    } else if (type === "password") {
      setPassword({ ...password, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  console.log(orderHistory);

  const handleUpdate = (event) => {
    event.preventDefault();
    const type = event.target.name;
    console.log(type);
    if (type == "profile") {
      dispatch(updateProfile(form))
        .then((res) => alert(res.value.data.msg))
        .catch((err) => alert(err));
    } else if (type == "password") {
      if (password.newPassword == password.confirmPassword) {
        dispatch(changePassword(password))
          .then((res) => {
            alert(res.value.data.msg);
            setImage(res.value.data.data.image);
          })
          .catch((err) => alert(err));
      } else {
        alert("password doens't match");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout())
      .then((res) => {
        localStorage.clear();
        navigate("/");
        location.reload();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Header></Header>

      <div className="bg-light pt-3 pb-5 mt-5 mt-lg-0">
        <main className={`container row mt-5 mx-auto ${styles.main} justify-content-center `}>
          <div className="col-12 col-lg-3 p-0 me-5">
            <div className="card mb-3 border-0  shadow-sm">
              <div className="card-header border-0 bg-transparent mt-3 ms-3 pt-3 text-black-50">
                INFO
              </div>
              <div className="justify-content-center d-flex">
                {userData.isLoading ? (
                  <div
                    className="spinner-border text-info "
                    style={{ width: "100px", height: "100px" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <label htmlFor="imageInput" className="invisible">
                    <img
                      src={
                        image
                          ? image.includes("http")
                            ? image
                            : `${process.env.REACT_APP_IMG_URL}${image}`
                          : `${process.env.REACT_APP_IMG_URL}default-profile.png`
                      }
                      alt=""
                      className={`${styles.roundImage} visible`}
                    />
                  </label>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  name="image"
                  id="imageInput"
                  onChange={(event) => handleChangeForm(event)}
                />
              </div>
              <div className="card-body mt-4">
                <h5 className="card-title text-center">{`${form.firstName} ${form.lastName}`}</h5>
                <p className="card-text text-center text-black-50">MovieGoers</p>
              </div>
              <div className="border mt-5"></div>
              <div className="card-footer bg-white text-center border-0">
                <button className={`btn btn-lg ${styles.mainBg} w-75 my-3`} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 p-0 ms-2">
            <nav className={`bg-white px-4 py-3 ${styles.tabs} shadow-sm `}>
              <div className={`nav nav-pills nav-fill`} id="nav-tab" role="tablist">
                <a
                  className={`nav-link active ${styles.target}`}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  href="#nav-home"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Account Setting
                </a>
                <a
                  className={`nav-link ${styles.target}`}
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  href="#nav-profile"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Order History
                </a>
              </div>
            </nav>

            <div className="tab-content mt-4 " id="nav-tabContent">
              <div
                className="tab-pane fade show active mx-3"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <form onSubmit={handleUpdate} name="profile" className="row ">
                  <div className="col-12 bg-white p-4  shadow-sm">
                    <h6>Details Information</h6>

                    <div className="border-top mt-2 pt-4">
                      <div className="form-row row gy-4">
                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="inputEmail4">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            name="firstName"
                            onChange={(event) => handleChangeForm(event)}
                            defaultValue={form.firstName}
                            required
                          />
                        </div>
                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="inputPassword4">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            name="lastName"
                            onChange={(event) => handleChangeForm(event)}
                            defaultValue={form.lastName}
                            required
                          />
                        </div>
                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="inputEmail4">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            name="email"
                            onChange={(event) => handleChangeForm(event)}
                            defaultValue={form.email}
                            required
                          />
                        </div>
                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="inputPassword4">Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            id="inputPassword4"
                            name="noTelp"
                            onChange={(event) => handleChangeForm(event)}
                            defaultValue={form.noTelp}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 p-0 ms-1">
                    <button className={`btn btn-lg w-100 my-3 ${styles.mainBg}`}>
                      Update Changes
                    </button>
                  </div>
                </form>

                <form name="password" onSubmit={handleUpdate} className="row">
                  <div className="col-12 bg-white p-4 shadow-sm ">
                    <h6>Account and Privacy</h6>
                    <div className="border-top mt-2 pt-4">
                      <div className="form-row row gy-4">
                        <div className="form-group col-12 col-lg-6">
                          <label>New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="inputEmail4"
                            name="newPassword"
                            onChange={handleChangeForm}
                            required
                          />
                        </div>
                        <div className="form-group col-12 col-lg-6">
                          <label htmlFor="inputPassword4">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="inputPassword4"
                            name="confirmPassword"
                            onChange={handleChangeForm}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 p-0">
                    <button className={`btn btn-lg w-100 mt-3 ${styles.mainBg}`}>
                      Update Changes
                    </button>
                  </div>
                </form>
              </div>

              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                {orderHistory.map((item) => (
                  <div className="bg-white pt-5 px-5 mt-4 shadow-sm" key={item.id}>
                    <div className="row d-flex flex-wrap align-items-center ">
                      <div className="col-10 order-1">
                        <p className="text-black-50">
                          {new Date(item.dateBooking).toDateString()} -{" "}
                          {item.timeBooking.slice(0, 5)}
                        </p>
                        <h3>{item.name}</h3>
                      </div>
                      <div className="col-12 col-md-2 order-0 order-lg-2 mb-3">
                        <img
                          src={require(`../../assets/image/${cinemaIcon[item.premiere]}`)}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="border mt-4 w-100 "></div>
                    <div className="row mt-3 py-3">
                      <div className="col-12 col-lg-4 ">
                        {item.statusUsed == "active" ? (
                          <button
                            className="btn btn-lg btn-success w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo"
                            onClick={() =>
                              dispatch(getBooking(item.id)).then((res) => {
                                setOrderDetail(res.value.data.data);
                              })
                            }
                          >
                            Ticket is active
                          </button>
                        ) : (
                          <button
                            className="btn btn-lg btn-secondary w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo"
                            onClick={() =>
                              dispatch(getBooking(item.id)).then((res) => {
                                setOrderDetail(res.value.data.data);
                              })
                            }
                          >
                            Ticket used
                          </button>
                        )}

                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className={`modal-dialog modal-xl`}>
                            <div
                              className={`modal-content`}
                              style={{
                                backgroundColor: "#eff0f7"
                              }}
                            >
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                  Proof of Payment
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className={`${styles.ticket} row mx-auto my-5 d-flex `}>
                                  <div className={`${styles.left} col-12 container order-1`}>
                                    <div className="d-flex container justify-content-between mt-3">
                                      <div className="d-none d-lg-block">
                                        <img
                                          src={require("../../assets/image/signLogo.png")}
                                          alt=""
                                          className=""
                                        />
                                      </div>
                                      <div className="text-white mt-3">
                                        <h5>Admit One</h5>
                                      </div>
                                    </div>
                                    <div className="mt-1 mx-auto container">
                                      <div className="row mb-4 gy-3 mt-lg-4 pt-lg-3">
                                        <div className="col-6 col-lg-12">
                                          <p className="text-black-50 mb-2">Movie</p>
                                          <h5 className="text-truncate">{orderDetail.name}</h5>
                                        </div>
                                        <div className="col-6 col-lg-4">
                                          <p className=" text-black-50 mb-2">Date</p>
                                          <h6>
                                            {orderDetail.dateBooking
                                              ? orderDetail.dateBooking.split("T")[0]
                                              : "00/00"}
                                          </h6>
                                        </div>
                                        <div className="col-6 col-lg-4">
                                          <p className=" text-black-50 mb-2">Time</p>
                                          <h6>{orderDetail.timeBooking.slice(0, 5)}</h6>
                                        </div>
                                        <div className="col-6 col-lg-4">
                                          <p className=" text-black-50 mb-2">Category</p>
                                          <h6 className="text-truncate">{orderDetail.category}</h6>
                                        </div>
                                        <div className="col-6 col-lg-4">
                                          <p className=" text-black-50 mb-2">Count</p>
                                          <h6>
                                            {orderDetail.seat.split(",").length
                                              ? orderDetail.seat.split(",").length
                                              : "0"}
                                          </h6>
                                        </div>
                                        <div className="col-6 col-lg-4">
                                          <p className=" text-black-50 mb-2">Seats</p>
                                          <h5>{orderDetail.seat}</h5>
                                        </div>
                                        <div className="col-6 col-lg-4 d-none d-lg-block">
                                          <p className=" text-black-50 mb-2">Price</p>
                                          <h5>IDR {orderDetail.totalPayment.toLocaleString()}</h5>
                                        </div>

                                        <div className="col-12 d-flex d-lg-none justify-content-between border pt-3 pb-2 px-3">
                                          <p className="text-black mb-0">Total</p>
                                          <h5>IDR {orderDetail.totalPayment.toLocaleString()}</h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={`${styles.right} col-12 container pt-3 order-md-2 `}
                                  >
                                    <div className="d-none d-lg-block ">
                                      <img
                                        src={require("../../assets/image/signLogo.png")}
                                        alt=""
                                        className="ms-4 mb-4"
                                      />
                                    </div>
                                    <div className="d-flex justify-content-center mt-4 pt-2 mt-lg-5">
                                      <QRCodeSVG
                                        value={`${process.env.REACT_APP_BASE_URL}booking/ticket/${orderDetail.id}`}
                                        // fgColor="#5f2eea"
                                        size={150}
                                      />
                                      ,
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-8 text-end text-black-50 fs-5 d-none d-lg-block">
                        <p>See Detais</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Profile;
