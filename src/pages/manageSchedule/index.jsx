import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import Pagination from "react-paginate";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import styles from "./manageSchedule.module.css";
import ErrorDiv from "../../components/error";
import { getData as getMovie } from "../../stores/action/movie";
import {
  getData as getSchedule,
  postData,
  updateData,
  deleteData
} from "../../stores/action/schedule";

function ManageSchedule() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const [page, setPage] = useState(params.page ? params.page : 1);

  const [isUpdate, setIsUpdate] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [location, setLocation] = useState("");
  const [locationList, setLocationList] = useState([]);
  const cinemaIcon = {
    "Ebu.Id": "Vector.png",
    CineOne21: "Vector-1.png",
    hiflix: "Vector-2.png"
  };
  const [image, setImage] = useState(null);
  const [movieId, setMovieId] = useState("");
  const [scheduleId, setScheduleId] = useState(null);
  const limit = 100;
  const movieData = useSelector((state) => state.movie);
  const schedule = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    movieId: null,
    location: "",
    price: 0,
    dateStart: "00/00/00",
    dateEnd: "00/00/00",
    premiere: "",
    time: ""
  });

  useEffect(() => {
    getData();

    dispatch(getSchedule(1, 6, location, sortValue, "")).then((res) => {
      let location = res.value.data.data.map((i) => i.location);
      location = Array.from(new Set(location)).map((i) => i);
      setLocationList(location);
    });
  }, []);

  useEffect(() => {
    const params = {};
    if (movieId) {
      params.movieId = movieId;
    }
    if (sortValue) {
      params.sort = sortValue;
    }
    if (location) {
      params.location = location;
    }
    navigate({
      pathname: "/manage/schedule",
      search: `?${createSearchParams(params)}`
    });

    dispatch(getSchedule(1, 6, location, sortValue, movieId));
  }, [sortValue, location, movieId]);

  const getData = async () => {
    try {
      dispatch(getMovie(1, limit, "", ""));
    } catch (error) {
      console.log(error);
    }
  };

  const setMovie = (event) => {
    let result = {};
    if (event.target?.value == "none") {
      result = { id: "", image: null };
    } else {
      result = event.target ? JSON.parse(event.target.value) : event;
      result = searchMovie(result);
      console.log(result);
    }
    // console.log(result);
    dispatch(getSchedule(1, 6, location, sortValue, result.id)).then((res) => {
      let location = res.value.data.data.map((i) => i.location);
      location = Array.from(new Set(location)).map((i) => i);
      setLocationList(location);
    });
    console.log(result);
    setImage(result.image);
    setMovieId(result.id);
  };
  console.log(movieId);
  const handleChangeForm = (event) => {
    const { name, value, files, type } = event.target;
    console.log(event.target.value);
    if (name === "name") {
      dispatch(getSchedule(1, 6, "", "", event.target.value));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!movieId) {
      alert("Please choose a movie to add first!");
    } else if (form.time && form.premiere) {
      const result = { ...form, time: form.time.join(","), movieId };
      console.log(result);
      dispatch(postData(result))
        .then((res) => {
          alert("post data success");
          getData();
        })
        .catch((err) => alert(err));
    }
    console.log("error");
    // handleReset();
  };

  const handleReset = () => {
    setForm({});
    setImage(null);
    setMovieId("");
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteData(id))
      .then((res) => {
        getData();
        alert("delete Success");
      })
      .catch((err) => alert(err));
  };

  const setUpdate = (data) => {
    const { id, movieId, location, price, dateStart, dateEnd, premiere, time } = data;
    setForm({
      location,
      price,
      dateStart: dateStart.split("T")[0],
      dateEnd: dateEnd.split("T")[0],
      premiere,
      time: time ? time.split(",") : []
    });

    setMovieId(movieId);
    setMovie(movieId);
    setScheduleId(id);
    setIsUpdate(true);
  };

  const searchMovie = (id) => {
    return movieData.data.find((item) => (item.id == id ? true : false));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (!movieId) {
      alert("Please choose a movie to edit first!");
    } else if (form.time && form.premiere) {
      const result = { ...form, time: form.time.join(","), movieId };
      console.log(result);
      console.log(scheduleId);
      dispatch(updateData(scheduleId, result))
        .then((res) => {
          alert("Update data success");
          getData();
          setIsUpdate(false);
        })
        .catch((err) => alert(err));
    }

    // handleReset();
  };

  const changeLocation = ({ target }) => {
    setLocation(target.value);
  };

  const sort = (value) => {
    console.log(value);
    if (sortValue == `${value} ASC`) {
      setSortValue(`${value} DESC`);
    } else {
      setSortValue(`${value} ASC`);
    }
  };

  const addTime = (event) => {
    event.preventDefault();
    let hour = event.target.hour.value;
    let minute = event.target.minute.value;
    if (+hour < 10) {
      hour = `0${hour}`;
    }
    if (+minute < 10) {
      minute = `0${minute}`;
    }

    setForm({ ...form, time: [...form.time, `${hour}:${minute}`] });
  };

  const handlePagination = (data) => {
    console.log(data.selected);

    setPage(data.selected + 1);
  };
  return (
    <>
      <Header></Header>

      <main className="bg-light border">
        <form
          className="container mt-5 row mx-auto bg-white rounded"
          onSubmit={isUpdate ? handleUpdate : handleSubmit}
          onReset={handleReset}
        >
          <div className="col-12 col-md-2 ">
            <div className={`mb-5 mt-5 text-center ${styles.cover}`}>
              <label htmlFor="imageInput">
                <img
                  src={
                    image
                      ? image.includes("http")
                        ? image
                        : `${process.env.REACT_APP_IMG_URL}${image}`
                      : `${process.env.REACT_APP_IMG_URL}default-movie.png`
                  }
                  alt=""
                  className="p-4 mx-auto d-block"
                />
              </label>
            </div>
          </div>

          <div className="col-12 col-md-10  mt-5">
            <div className="row mt-3 mx-auto">
              <div className="col-12 col-md-6 form-group">
                <label className="text-black-50 mb-1">Movie</label>
                <select
                  className="form-select bg-white "
                  type="text"
                  placeholder="Movie Name"
                  name="name"
                  required
                  value={movieId}
                  onChange={(event) => setMovie(event)}
                >
                  <option value={"none"}>{"Select Movie"}</option>
                  {movieData.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-6 select-form">
                <label className="text-black-50 mb-1">Location</label>
                <select
                  className="form-select bg-white"
                  type="text"
                  placeholder="Location"
                  name="location"
                  required
                  onChange={(event) => handleChangeForm(event)}
                  value={form.location}
                >
                  <option>Choose Location</option>
                  <option value={"Jakarta"}>Jakarta</option>
                  <option value={"Bali"}>Bali</option>
                </select>
              </div>

              <div className="w-100"></div>

              <div className="col-12 col-md-6 form-group mt-3 d-lg-none">
                <label className="text-black-50 mb-1">Premiere</label>
                <select
                  className="form-select bg-white"
                  type="text"
                  placeholder="Movie Name"
                  name="premiere"
                  defaultValue={""}
                >
                  <option value={""}>Select Premiere</option>
                  {["Ebu.Id", "CineOne21", "hiflix"].map((item) => (
                    <option
                      key={item}
                      value={item}
                      onClick={() => setForm({ ...form, premiere: item })}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6 form-group mt-3">
                <label className="text-black-50 mb-1">Price</label>
                <input
                  className="form-control bg-white"
                  type="number"
                  min={0}
                  placeholder="Director"
                  name="price"
                  required
                  onChange={(event) => handleChangeForm(event)}
                  value={form.price}
                ></input>
              </div>

              <div className="col-12 col-md-6 d-flex mt-3">
                <div className="form-group col-6 pe-3">
                  <label className="text-black-50 mb-1">Date Start</label>
                  <input
                    type="date"
                    className="form-control bg-white"
                    name="dateStart"
                    min={0}
                    onChange={(event) => handleChangeForm(event)}
                    required
                    value={form.dateStart}
                  />
                </div>
                <div className="form-group col-6 ps-3">
                  <label className="text-black-50 mb-1">Date End</label>
                  <input
                    type="date"
                    className="form-control bg-white"
                    name="dateEnd"
                    min={0}
                    max={59}
                    onChange={(event) => handleChangeForm(event)}
                    required
                    value={form.dateEnd}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 mt-4 d-none d-lg-inline ">
                <label className="col-12 text-black-50 mb-1">Premiere</label>
                <div className="row">
                  <button
                    type="button"
                    className={`col-4 btn btn-lg rounded-3 ${
                      form.premiere == "Ebu.Id" ? "shadow" : ""
                    } `}
                    onClick={() => setForm({ ...form, premiere: "Ebu.Id" })}
                  >
                    <img src={require("../../assets/image/Vector.png")} alt="" />
                  </button>
                  <button
                    type="button"
                    className={`col-4 btn btn-lg rounded-3 ${
                      form.premiere == "hiflix" ? "shadow" : ""
                    } `}
                    onClick={() => setForm({ ...form, premiere: "hiflix" })}
                  >
                    <img src={require("../../assets/image/Vector-2.png")} alt="" />
                  </button>
                  <button
                    type="button"
                    className={`col-4 btn btn-lg rounded-3 ${
                      form.premiere == "CineOne21" ? "shadow" : ""
                    } `}
                    onClick={() => setForm({ ...form, premiere: "CineOne21" })}
                  >
                    <img src={require("../../assets/image/Vector-1.png")} alt="" />
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-6 mt-4 ">
                <label className="col-12 text-black-50 ">Time</label>
                <div className="row pt-3 ms-1 gy-3">
                  <button
                    type="button"
                    className={`col-3 btn border fs-3 p-0 border-primary ${styles.mainText}`}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="bi bi-plus-lg "></i>
                  </button>

                  {form.time
                    ? form.time.map((item, index) => (
                        <button type="button" className="col-3 btn btn-sm fs-6" key={index}>
                          {item}
                        </button>
                      ))
                    : ""}
                </div>
              </div>
              <div className="text-end mb-5 mx-1 row gy-4 mt-0 p-0">
                <button
                  type="reset"
                  className={`col-12 col-lg-2 btn btn-primary ms-auto me-3 btn-lg bg-white shadow  ${styles.mainText}`}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className={`col-12 col-lg-2 btn btn-primary btn-lg  shadow  ${styles.mainBg}`}
                >
                  {isUpdate ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>

        <form
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          onSubmit={(event) => addTime(event)}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Input Time
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="col-6  w-100 my-3">
                  <div className="form-group col-6  mx-auto">
                    <label className="text-black-50 mb-1">Hour</label>
                    <input
                      type="number"
                      className="form-control bg-white"
                      name="hour"
                      min={0}
                      onChange={(event) => handleChangeForm(event)}
                      required
                    />
                  </div>
                  <div className="form-group col-6  mx-auto">
                    <label className="text-black-50 mb-1">Minute</label>
                    <input
                      type="number"
                      className="form-control bg-white"
                      name="minute"
                      min={0}
                      max={59}
                      onChange={(event) => handleChangeForm(event)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>

        <section className="container mt-5 pb-3 pt-5 bg-light">
          <div className="row bg-light mb-4">
            <div className="col-12 col-lg-8 fw-bold fs-5 ">Data Schedule</div>
            <div className={`col-12 col-lg-4 row mt-3 mt-lg-0 p-0 ms-auto `}>
              <div className="col-5 dropdown  rounded-3  d-flex p-0">
                <button
                  className="btn bg-white border rounded-3 dropdown-toggle text-center mx-auto"
                  type="button"
                  id="sort"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="px-3 text-capitalize">
                    {sortValue
                      ? sortValue.includes("ASC")
                        ? sortValue.split(" ")[0] + " ↓"
                        : sortValue.split(" ")[0] + " ↑"
                      : "Sort"}
                  </span>
                </button>
                <ul className="dropdown-menu bg-white" aria-labelledby="sort">
                  <li>
                    <a className="dropdown-item" onClick={() => sort("price")}>
                      Price
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 form-group  ">
                <select
                  className="form-select border text-start btn bg-white "
                  type="text"
                  name="location"
                  defaultValue={""}
                  onChange={(event) => changeLocation(event)}
                >
                  <option value={""}>Location</option>
                  {locationList.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className=" bg-white py-4 rounded">
            <div className="">
              <div className="my-5">
                <div className="row justify-content-evenly gy-5">
                  {/*  */}
                  {schedule.isLoading ? (
                    <div
                      className={`spinner-grow  ${styles.mainText}`}
                      style={{ height: "162px", width: "162px", verticalAlign: "center" }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : schedule.data.length ? (
                    schedule.data.map((item) => (
                      <div className="col-lg-4 justify-content-center " key={item.id}>
                        <div
                          className={`card mx-auto text-center ${
                            item.id == scheduleId ? "shadow" : ""
                          }`}
                          style={{ width: "325px" }}
                        >
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
                            <div className="border my-3"></div>
                            <div
                              className="row justify-content-evenly gy-5 pt-4"
                              style={{ fontSize: "12px", height: "120px" }}
                            >
                              {item.time.split(",").map((itemTime, i) => (
                                <div className="col-3 mt-3 fw-light" key={i}>
                                  <button
                                    className={`btn btn-sm "bg-white"
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
                            <div className="mt-3 d-flex justify-content-between mx-2">
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
                              className="btn btn-primary text-primary me-3 bg-white "
                              style={{ backgroundColor: "#5f2eea" }}
                              onClick={() => setUpdate(item)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger text-danger bg-white"
                              style={{ backgroundColor: "#5f2eea" }}
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
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
        <div className="pagination mb-3 w-100">
          <Pagination
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={schedule.pageInfo.totalPage ? schedule.pageInfo.totalPage : page}
            onPageChange={handlePagination}
            containerClassName={styles.pagination}
            subContainerClassName={(styles.pages, styles.pagination)}
            activeClassName={styles.active}
            initialPage={page - 1}
          />
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default ManageSchedule;
