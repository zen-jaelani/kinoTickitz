import React, { useState, useEffect } from "react";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import ErrorDiv from "../../components/error";
import styles from "./home.module.css";
import axios from "../../utils/axios";
import MovieCard from "../../components/cards/movie";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const limit = 6;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [errorData, setErrorData] = useState();
  const [upcomingData, setUpcomingData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [month, setMonth] = useState("");
  const monthList = [
    { index: 1, name: "January" },
    { index: 2, name: "February" },
    { index: 3, name: "March" },
    { index: 4, name: "April" },
    { index: 5, name: "May" },
    { index: 6, name: "June" },
    { index: 7, name: "July" },
    { index: 8, name: "August" },
    { index: 9, name: "September" },
    { index: 10, name: "October" },
    { index: 11, name: "November" },
    { index: 12, name: "December" }
  ];

  useEffect(() => {
    getMovie();
    document.body.className = "bg-white";
  }, []);

  useEffect(() => {
    getMovie();
  }, [month]);

  const getMovie = async () => {
    try {
      const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);
      const upcoming = await axios.get(`movie?page=${page}&limit=${limit}&searchRelease=${month}`);
      setData(resultMovie.data.data);
      setUpcomingData(upcoming.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error, error.response);
      if (error.response.status == 404) {
        setUpcomingData([]);
      }
      setErrorData(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    console.log(id);
    navigate(`/detail/${id}`);
  };

  console.log(upcomingData);

  const changeMonth = (value) => {
    if (value == month) {
      setMonth("");
    } else {
      setMonth(value);
    }
  };

  return (
    <>
      <Header />

      <main className={`container mt-5 ${styles.main}`}>
        <div className="row mt-5 mx-3">
          <p className={`m-0 p-0 ${styles.subtitle}`}>Nearest Cinema,Newest Movie,</p>
          <h1 className={`p-0 ${styles.mainColor} ${styles.title}`}>Find out now!</h1>
        </div>
        <div className="row-6 d-flex justify-content-center mt-5">
          <div className="mx-auto">
            <img src={require("../../assets/image/Group 14.png")} alt="" />
          </div>
        </div>
      </main>

      <section className={`container-fluid mt-5 pb-5 ${styles.movieV1}`}>
        <div className="container mx-auto">
          <div className="row pt-5">
            <div className={`col ${styles.mainColor} fs-5`}>Now Showing</div>
            <div className={`col text-end pl-3 px-5 ${styles.mainColor} fs-5`}>
              <Link to={"/all"} className={styles.mainColor}>
                view all
              </Link>
            </div>
          </div>
          <div className={`row d-flex flex-row flex-nowrap mt-3 p-0 ${styles.cardOverflow}`}>
            {data ? (
              data.map((item) => (
                <MovieCard
                  key={item.id}
                  data={item}
                  className="m-3"
                  type="showing"
                  handleDetail={handleDetailMovie}
                />
              ))
            ) : (
              <ErrorDiv />
            )}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row pt-5">
          <div className="col fw-bold fs-5 p-md-0 pb-3">Upcoming Movie</div>
          <div className={`col text-end pl-3 px-5 fs-5`}>
            <Link to={"/all"} className={styles.mainColor}>
              view all
            </Link>
          </div>
        </div>

        <div
          className={`row d-flex flex-row flex-nowrap mt-3 p-0 ${styles.cardOverflow} ${styles.month}`}
        >
          {monthList.map((item) => (
            <button
              className={`btn btn-white btn-lg mx-4 px-0 ${
                month === item.index ? styles.mainBg : "bg-white"
              }`}
              onClick={() => changeMonth(item.index)}
              key={item.index}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className={`row d-flex flex-row flex-nowrap mt-3 p-0 ${styles.cardOverflow}`}>
          {upcomingData.length ? (
            upcomingData.map((item) => (
              <MovieCard
                key={item.id}
                data={item}
                className="m-3"
                type="upcoming"
                handleDetail={handleDetailMovie}
              />
            ))
          ) : (
            <ErrorDiv data={errorData} />
          )}
        </div>

        <div className="row-6 container mb-5 pt-5">
          <div
            className={`cols card shadow p-3 mb-5 border-0 rounded mx-auto text-center ${styles.subscribe}`}
          >
            <div className="card-body">
              <div className={`${styles.spacing} mx-auto`}>
                <p className={`m-0 ${styles.subtitle}`}>Be the vanguard of the</p>
                <h5 className={`${styles.mainColor} ${styles.title}`}>Movegoers</h5>
                <input type="email" className="form-control mt-5" placeholder="Type your email" />
                <button
                  className="btn btn-primary btn-lg w-100 mt-3"
                  style={{ backgroundColor: "#752eea" }}
                >
                  Join now
                </button>
                <p className={`${styles.cardDesc} mt-5 mx-auto w-75 ${styles.subtitle}`}>
                  By joining you as a Tickitz member, we will always send you the latest updates via
                  email .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
