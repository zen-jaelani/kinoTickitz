import React, { useState, useEffect } from "react";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import ErrorDiv from "../../components/error";
import styles from "./allMovie.module.css";
import MovieCard from "../../components/cards/movie";
import axios from "../../utils/axios";
import Pagination from "react-paginate";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AllMovie() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const limit = 8;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [errorData, setErrorData] = useState();
  const [pageInfo, setPageInfo] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
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
    setSearchValue(state ? state : "");
    getMovie();
  }, []);

  useEffect(() => {
    getMovie();
  }, [page, month, searchValue, sortValue]);

  const getMovie = async () => {
    try {
      const resultMovie = await axios.get(
        `movie?page=${page}&limit=${limit}&searchRelease=${month}&sort=${sortValue}&searchName=${searchValue}`
      );
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error, error.response);
      if (error.response.status == 404) {
        setData([]);
      }
      setErrorData(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    console.log(id);
    navigate(`/detail/${id}`);
  };

  const handlePagination = (data) => {
    console.log(data.selected);
    setPage(data.selected + 1);
  };

  const changeMonth = (value) => {
    if (value == month) {
      setMonth("");
    } else {
      setMonth(value);
    }
  };

  const sort = (value) => {
    console.log(value);
    if (sortValue == `${value} ASC`) {
      setSortValue(`${value} DESC`);
    } else {
      setSortValue(`${value} ASC`);
    }
  };

  const search = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(searchValue);

  return (
    <>
      <Header></Header>

      <main className="container-fluid pb-5 pt-5 bg-light">
        <section className="container">
          <div className="row pt-5">
            <div className="col fw-bold fs-5 p-md-0 pb-3">All Movie</div>
            <div
              className={`col d-flex justify-content-end text-end pl-3 px-5 ${styles.mainColor}`}
            >
              <div className="dropdown bg-white rounded-3 border me-2 d-flex p-0">
                <button
                  className="btn btn-white rounded-3 dropdown-toggle text-center mx-auto"
                  type="button"
                  id="sort"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="px-3"> {sortValue ? sortValue : "Sort"} </span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="sort">
                  <li>
                    <a className="dropdown-item" onClick={() => sort("name")}>
                      name
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="search movie name"
                  onChange={search}
                />
              </div>
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
        </section>

        <div className="container bg-white mt-5 py-5">
          <div className="">
            <div className="mt-5">
              <div className="row justify-content-evenly gy-5">
                {data.length ? (
                  data.map((item) => (
                    <div className="col-lg-3 justify-content-center " key={item.id}>
                      <MovieCard data={item} type="upcoming" handleDetail={handleDetailMovie} />
                    </div>
                  ))
                ) : (
                  <ErrorDiv data={errorData} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pagination mt-3 w-100">
          <Pagination
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageInfo.totalPage ? pageInfo.totalPage : page}
            onPageChange={handlePagination}
            containerClassName={styles.pagination}
            subContainerClassName={(styles.pages, styles.pagination)}
            activeClassName={styles.active}
          />
        </div>
      </main>

      <Footer></Footer>
    </>
  );
}

export default AllMovie;
