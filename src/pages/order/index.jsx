import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axios";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import styles from "./order.module.css";
import Seats from "../../components/seat";

function Order() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const listSeats = ["A", "B", "C", "D", "E", "F", "G"];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getSchedule();
  }, []);

  const getSchedule = async () => {
    try {
      const result = await axios.get(`schedule/${state.scheduleId}`);
      const seat = await axios.get(
        `/booking/seat?scheduleId=${state.scheduleId}&timeBooking=${state.bookingTime}:00&dateBooking=${state.dateBooking}`
      );

      //   console.log(seat);
      setReservedSeat(seat.data.data.map((item) => item.seat.split(",")).flat());
      //   setReservedSeat(seat.data.data ? seat.data.data : []);
      setSchedule(result.data.data[0]);
    } catch (error) {
      console.log(error, error.response);
    }
  };
  //   console.log(state);
  console.log(reservedSeat);

  const handleSelectSeat = (seat) => {
    // console.log(seat);
    if (selectedSeat.includes(seat)) {
      const deleteSeat = selectedSeat.filter((i) => i !== seat);
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };

  const dataPayment = {
    date: state.dateBooking,
    time: state.bookingTime,
    movie: state.name,
    cinemaName: schedule.premiere,
    seat: selectedSeat,
    total: selectedSeat.length * schedule.price,
    schedule: state.scheduleId
  };

  const cinemaIcon = {
    "Ebu.Id": "Vector.png",
    CineOne21: "Vector-1.png",
    hiflix: "Vector-2.png"
  };

  //   console.log(dataPayment);

  const handleOrder = () => {
    navigate("/payment", { state: dataPayment });
  };

  return (
    <>
      <Header></Header>
      <main className="container-fluid" id="working" style={{ backgroundColor: "#f5f6f8" }}>
        <div className="container row d-flex d-lg-block py-5 mx-auto">
          <div className="col-lg-8 float-start mb-lg-5">
            <section className="d-none d-lg-block mb-4">
              <h6>Movie Selected</h6>
              <div className="card">
                <div className="card-body d-flex justify-content-between px-5">
                  <h6 className="m-0 pt-2">{state.name}</h6>
                  <Link to={"/all"} className={`btn btn-light ${styles.mainText}`}>
                    Change Movie
                  </Link>
                </div>
              </div>
            </section>

            <article>
              <h6>Choose Your Seat</h6>
              <div className="card seat">
                <div className="card-body container w-75 py-3 d-flex flex-column">
                  <p className="d-none d-lg-block text-center m-0 text-muted">Screen</p>
                  <hr className={`w-100 mb-3 ${styles.hr}`} />
                  <div className="h-auto " style={{}} id="seat-selection">
                    <div className="vr border border-success border-2 d-block d-lg-none"></div>

                    {listSeats.map((item) => (
                      <div key={item}>
                        <Seats
                          rowSeat={item}
                          selectedSeat={handleSelectSeat}
                          reserved={reservedSeat}
                          selected={selectedSeat}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="my-4">
                    <p className="my-3">Seating Key</p>
                    <div className={`d-flex flex-row flex-wrap ${styles.flexMax2}`}>
                      <p className="d-lg-none">
                        <i className="bi bi-arrow-down"></i> A - G
                      </p>
                      <p className="d-lg-none">
                        <i className="bi bi-arrow-right"></i> 1 - 14
                      </p>
                      <p className="">
                        <i className={`bi bi-square-fill pe-1 ${styles.available}`}></i>
                        Available
                      </p>
                      <p className="">
                        <i className={`bi bi-square-fill ${styles.mainText}`}></i> Selected
                      </p>
                      <p>
                        <i className="bi bi-square-fill text-secondary"></i> Sold
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="col-lg-4 float-lg-end" id="order-info">
            <aside className="my-5 mt-lg-0">
              <h6>Order Info</h6>
              <div className="card text-center">
                <div className="card-body mx-auto mt-4 mt-lg-0">
                  <div className="card-title p-2">
                    <img
                      src={require(`../../assets/image/${
                        cinemaIcon[schedule.premiere] || "Vector.png"
                      }`)}
                      style={{ width: "100px" }}
                      alt=""
                    />
                    <div>
                      <p className="fs-1 m-0 py-3">{schedule.premiere}</p>
                    </div>
                  </div>
                  <div className="row gy-3">
                    <div className="col-6 text-black-50 text-start">Movie selected</div>
                    <div className="col-6 text-end">{state.name}</div>
                    <div className="col-6 text-black-50 text-start">
                      {new Date(state.dateBooking).toDateString()}
                    </div>
                    <div className="col-6 text-end">{state.bookingTime} </div>
                    <div className="col-6 text-black-50 text-start">One ticket price</div>
                    <div className="col-6 text-end">
                      {schedule.price
                        ? schedule.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR"
                          })
                        : 0}
                    </div>
                    <div className="col-6 text-black-50 text-start">Seat choosen</div>
                    <div className="col-6 text-end word-break">
                      {selectedSeat.length ? `${selectedSeat} ` : "Nothing"}
                    </div>
                  </div>
                  <hr className="border mb-3" />
                  <div className="row me-1">
                    <div className="col-6 text-start fs-4">Total Payment</div>
                    <div className={`col-6 text-end fs-4 m-0 p-0 ${styles.mainText}`}>
                      {(selectedSeat.length * schedule.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR"
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <section
            className={`d-flex justify-content-between mt-4 col-lg-8 ${styles.bottomButton}`}
          >
            <Link
              to={"/all"}
              className={`btn btn-lg shadow h-100 py-3 fs-5 ${styles.mainText} d-none d-lg-inline`}
            >
              Change Your Movie
            </Link>
            <button
              className={`btn btn-lg shadow h-100 py-3 fs-5 ${styles.mainBg}`}
              onClick={handleOrder}
              disabled={selectedSeat.length ? false : true}
            >
              Checkout now
            </button>
          </section>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Order;
