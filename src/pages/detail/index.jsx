import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import styles from "./detail.module.css";
import ErrorDiv from "../../components/error";

function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [dataOrder, setDataOrder] = useState({
    movieId: params.id,
    dateBooking: new Date().toISOString().split("T")[0]
  });
  const [schedule, setSchedule] = useState([]);
  const [location, setLocation] = useState("");
  const [locationList, setLocationList] = useState([]);
  const cinemaIcon = {
    "Ebu.Id": "Vector.png",
    CineOne21: "Vector-1.png",
    hiflix: "Vector-2.png"
  };

  useEffect(() => {
    (async () => {
      const result = await getData();
      setLocationList(result);
    })();
  }, []);
  useEffect(() => {
    getData();
  }, [location]);

  const getData = async () => {
    try {
      const result = await axios.get(`movie/${params.id}`);
      const resultSchedule = await axios.get(
        `schedule?searchMovieId=${params.id}&searchLocation=${location}&limit=6`
      );
      setData(result.data.data[0]);
      setSchedule(resultSchedule.data.data);
      return await resultSchedule.data.data.map((i) => i.location);
    } catch (error) {
      console.log(error.response.data.msg);
      if (error.response.data.msg == "Please login first") {
        localStorage.removeItem("id");
        window.location = window.location.protocol + "//" + window.location.host + "/auth/login";
      }
    }
  };

  console.log(Array.from(new Set(locationList)));
  console.log(schedule.premiere);

  const changeDataBooking = (item) => {
    setDataOrder({ ...dataOrder, ...item, ...data });
  };

  const handleBooking = () => {
    navigate("/order", { state: dataOrder });
  };

  const changeDate = (event) => {
    console.log(event.target.value);
    setDataOrder({ ...dataOrder, dateBooking: event.target.value });
  };

  const changeLocation = (value) => {
    console.log(value);
    setLocation(value);
  };
  //   console.log(schedule);

  return (
    <>
      <Header></Header>
      <main className="container mt-5 d-md-flex">
        <div className="row flex-grow-1">
          <div className={`col-12 col-md-1 mb-5 mx-auto mx-md-0 mt-md-4 ${styles.cover}`}>
            <img
              src={
                data.image
                  ? `https://res.cloudinary.com/qxtlp/image/upload/v1649062140/${data.image}`
                  : "https://res.cloudinary.com/qxtlp/image/upload/v1650786142/default-movie.png"
              }
              alt=""
              className="p-4 mx-auto d-block"
            />
          </div>
        </div>

        <div className="mx-3">
          <div className="row mt-4">
            <div className="col">
              <h3 className="text-center text-md-start ps-3">{data.name}</h3>
              <p className="text-center text-md-start ps-3 text-muted">{data.category} </p>
            </div>
          </div>
          <div className="row mt-3 mb-4 mx-auto">
            <div className="col-6">
              <p className="text-black-50 mb-1">Release date</p>
              <p>{data.releaseDate ? new Date(data.releaseDate).toDateString() : ""}</p>
            </div>
            <div className="col-6">
              <p className="text-black-50 mb-1">Directed by</p>
              <p>{data.director}</p>
            </div>
            <div className="w-100"></div>
            <div className="col-6">
              <p className="text-black-50 mb-1">Duration</p>
              <p>{data.duration}</p>
            </div>
            <div className="col-6">
              <p className="text-black-50 mb-1">Casts</p>
              <p>{data.casts}</p>
            </div>
          </div>
          <hr />
          <div className="row mt-3 mx-auto">
            <div className="col-12 my-3">
              <h5>Synopsis</h5>
            </div>
            <div className="col-12">
              <p className="lh-lg text-secondary">{data.synopsis}</p>
            </div>
          </div>
        </div>
      </main>

      <section className="container-fluid mt-5 mb-5 pb-5 pt-5 bg-light">
        <div className="container">
          <div className="row mt-4">
            <div className="col-12">
              <h3 className="text-center">Showtimes and Tickets</h3>
            </div>
            <div className="col-12 mx-auto w-50 mt-3 d-md-flex justify-content-around">
              <div className="input-group bg-transparent" style={{ width: "200px" }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-calendar-date"></i>
                  </span>
                </div>
                <input
                  type="date"
                  defaultValue={dataOrder.dateBooking}
                  min={dataOrder.dateBooking}
                  onChange={changeDate}
                  className="form-control bg-transparent"
                />
              </div>
              <div className="dropdown d-flex mt-2 mt-md-0">
                <button
                  className="btn btn-light dropdown-toggle text-center mx-auto"
                  type="button"
                  id="city"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-pin-map"></i>
                  <span className="px-3"> {location ? location : "Set a city"} </span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="city">
                  <li>
                    <a className="dropdown-item" onClick={() => changeLocation("")}>
                      All
                    </a>
                  </li>
                  {Array.from(new Set(locationList)).map((i) => (
                    <li key={i}>
                      <a className="dropdown-item" onClick={() => changeLocation(i)}>
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="">
            <div className="my-5">
              <div className="row justify-content-evenly gy-5">
                {/*  */}
                {schedule.length ? (
                  schedule.map((item) => (
                    <div className="col-lg-4 justify-content-center " key={item.id}>
                      <div className="card mx-auto text-center" style={{ width: "325px" }}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between w-75 mx-auto">
                            <h5 className="card-title mt-2 ">
                              <img
                                src={require(`../../assets/image/${cinemaIcon[item.premiere]}`)}
                                alt=""
                              />
                            </h5>
                            <div className="vr" style={{ padding: "0.56px" }}></div>
                            <p className="d-grid card-text text-secondary fs-6 fw-lighter">
                              <span>{item.premiere}</span>
                              <span>{item.location}</span>
                            </p>
                          </div>
                          <hr />
                          <div
                            className="row justify-content-evenly gy-5 pt-4"
                            style={{ fontSize: "12px", height: "120px" }}
                          >
                            {item.time.split(",").map((itemTime, i) => (
                              <div className="col-3 mt-3 fw-light" key={i}>
                                <button
                                  className={`btn btn-sm ${
                                    itemTime == dataOrder.bookingTime &&
                                    item.id == dataOrder.scheduleId
                                      ? styles.mainBg
                                      : "bg-white"
                                  }`}
                                  onClick={() =>
                                    changeDataBooking({
                                      bookingTime: itemTime,
                                      scheduleId: item.id
                                    })
                                  }
                                >
                                  {itemTime}
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 d-flex justify-content-between">
                            <p className="text-secondary">Price</p>
                            <a>
                              {item.price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR"
                              })}
                              /seat
                            </a>
                          </div>
                          <button
                            className="btn btn-primary w-100"
                            style={{ backgroundColor: "#5f2eea" }}
                            disabled={item.id === dataOrder.scheduleId ? false : true}
                            onClick={handleBooking}
                          >
                            Book now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <ErrorDiv data={{ status: 404, statusText: "No Schedule avaliable" }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
}

export default Detail;
