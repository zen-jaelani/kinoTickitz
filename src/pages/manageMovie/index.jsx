import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-paginate";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import styles from "./manageMovie.module.css";
import ErrorDiv from "../../components/error";
import MovieCard from "../../components/cards/movie";
import { getData as getAllData, postData, deleteData, updateData } from "../../stores/action/movie";

function ManageMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const limit = 8;
  const [page, setPage] = useState(params.page ? params.page : 1);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    image: null,
    director: "",
    casts: "",
    releaseDate: "",
    duration: "",
    synopsis: ""
  });

  const [idMovie, setIdMovie] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);

  const movieData = useSelector((state) => state.movie);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const params = {};
    if (page !== "1") {
      params.page = page;
    }
    if (sortValue) {
      params.sort = sortValue;
    }
    if (searchValue) {
      params.searchValue = searchValue;
    }
    navigate({
      pathname: "/manage/movie",
      search: `?${createSearchParams(params)}`
    });
    getData();
  }, [page, sortValue, searchValue]);

  const getData = async () => {
    try {
      dispatch(getAllData(page, limit, sortValue, searchValue));
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handlePagination = (data) => {
    console.log(data.selected);

    setPage(data.selected + 1);
  };

  const handleChangeForm = (event) => {
    const { name, value, files, type } = event.target;

    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
      setImage(files ? URL.createObjectURL(files[0]) : null);
    } else if (type === "number") {
      console.log(event.target.name);
      setForm({ ...form, duration: { ...form.duration, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  console.log(image);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    formData.set("duration", `${form.duration.hour}h ${form.duration.minute}m`);
    for (const data of formData.entries()) {
      console.log(data[0] + ": " + data[1]);
    }

    dispatch(postData(formData))
      .then((res) => {
        alert("post data success");
        getData();
      })
      .catch((err) => alert(err));

    handleReset();
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id))
      .then((res) => {
        getData();
        alert(res);
      })
      .catch((err) => alert(err));
  };

  const setUpdate = (data) => {
    console.log(data);
    const { id, name, category, image, director, casts, releaseDate, duration, synopsis } = data;

    const [hour, minute] = duration.replace(/[a-z]/g, "").split(" ");
    console.log(hour);
    setForm({
      name,
      category,
      image,
      director,
      casts,
      releaseDate: releaseDate.split("T")[0],
      duration: { hour, minute },
      synopsis
    });
    setIdMovie(id);
    setIsUpdate(true);
    setImage(image);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    formData.set("duration", `${form.duration.hour}h ${form.duration.minute}m`);
    for (const data of formData.entries()) {
      console.log(data[0] + ": " + data[1]);
    }

    setIsUpdate(false);
    handleReset();

    dispatch(updateData(idMovie, formData))
      .then((res) => {
        alert(res);
        getData();
      })
      .catch((err) => alert(err));
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
    setPage(1);
    setSearchValue(event.target.value);
  };

  const handleReset = () => {
    setForm({
      name: "",
      category: "",
      image: null,
      director: "",
      casts: "",
      releaseDate: "",
      duration: "",
      synopsis: ""
    });
    setImage(null);
  };

  return (
    <>
      <Header></Header>
      <main className="bg-light border">
        <form
          className="container mt-5 row border mx-auto bg-white rounded"
          onSubmit={isUpdate ? handleUpdate : handleSubmit}
          onReset={handleReset}
        >
          <div className="col-12 col-md-2  ">
            <div className={`mb-5 mt-5 text-center ${styles.cover}`}>
              <label htmlFor="imageInput" className={`mx-auto`}>
                <img
                  src={
                    image
                      ? image.includes("http")
                        ? image
                        : `${process.env.REACT_APP_IMG_URL}${image}`
                      : `${process.env.REACT_APP_IMG_URL}default-movie.png`
                  }
                  alt=""
                  className="p-4"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                className="d-none"
                name="image"
                id="imageInput"
                onChange={(event) => handleChangeForm(event)}
              />
            </div>
          </div>

          <div className="col-12 col-md-10 mt-lg-3">
            <div className="row mt-3 mx-auto gy-3">
              <div className="col-12 col-md-6 form-group">
                <label className="text-black-50 mb-1">Movie Name</label>
                <input
                  className="form-control bg-white  "
                  type="text"
                  placeholder="Movie Name"
                  name="name"
                  required
                  onChange={(event) => handleChangeForm(event)}
                  value={form.name}
                ></input>
              </div>
              <div className="col-12 col-md-6 form-group">
                <label className="text-black-50 mb-1">Category</label>
                <input
                  className="form-control bg-white "
                  type="text"
                  placeholder="Category"
                  name="category"
                  required
                  onChange={(event) => handleChangeForm(event)}
                  value={form.category}
                ></input>
              </div>

              <div className="w-100"></div>

              <div className="col-12 col-md-6 form-group mt-3">
                <label className="text-black-50 mb-1">Director</label>
                <input
                  className="form-control bg-white "
                  type="text"
                  placeholder="Director"
                  name="director"
                  required
                  onChange={(event) => handleChangeForm(event)}
                  value={form.director}
                ></input>
              </div>
              <div className="col-12 col-md-6 form-group mt-3">
                <label className="text-black-50 mb-1">Casts</label>
                <input
                  className="form-control bg-white "
                  type="text"
                  placeholder="Cast"
                  name="casts"
                  required
                  onChange={(event) => handleChangeForm(event)}
                  value={form.casts}
                ></input>
              </div>

              <div className="w-100"></div>

              <div className="col-12 col-md-6 form-group mt-3">
                <label className="text-black-50 mb-1">Release Date</label>
                <input
                  className="form-control bg-white "
                  placeholder="Release Date"
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  name="releaseDate"
                  required
                  onChange={(event) => handleChangeForm(event)}
                  value={form.releaseDate}
                ></input>
              </div>

              <div className="col-12 col-md-6 d-flex mt-3">
                <div className="form-group col-6 pe-3">
                  <label className="text-black-50 mb-1">Duration Hour</label>
                  <input
                    type="number"
                    className="form-control bg-white "
                    name="hour"
                    min={0}
                    onChange={(event) => handleChangeForm(event)}
                    required
                    value={form.duration.hour}
                  />
                </div>
                <div className="form-group col-6 ps-3">
                  <label className="text-black-50 mb-1">Duration Minute</label>
                  <input
                    type="number"
                    className="form-control bg-white "
                    name="minute"
                    min={0}
                    max={59}
                    onChange={(event) => handleChangeForm(event)}
                    required
                    value={form.duration.minute}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 m-0 mt-3 mt-lg-0 mx-2">
            <h5 className="m-0">Synopsis</h5>
          </div>
          <div className="col-12 form-group mt-3 mb-5 ">
            <textarea
              className="form-control bg-white  "
              rows="4"
              name="synopsis"
              required
              placeholder="Synopsis"
              onChange={(event) => handleChangeForm(event)}
              value={form.synopsis}
            ></textarea>
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
        </form>

        <section className="container mt-5">
          <div className="row">
            <div className="col-12 col-lg-8 fw-bold fs-5 ">Data Movie</div>
            <div className={`col-12 col-lg-4 row mt-3 mt-lg-0 p-0 ms-auto ${styles.mainColor}`}>
              <div className="col-5 dropdown bg-white rounded-3 border me-2 d-flex p-0">
                <button
                  className=" btn btn-white rounded-3 dropdown-toggle text-center mx-auto"
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
                <ul className="dropdown-menu" aria-labelledby="sort">
                  <li>
                    <a className="dropdown-item" onClick={() => sort("name")}>
                      name
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control  "
                  placeholder="search movie name"
                  onChange={search}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container bg-white mt-3 rounded border py-5">
          <div className="">
            <div className="mb-4">
              <div className="row justify-content-evenly gy-5">
                {movieData.isLoading ? (
                  <div
                    className={`spinner-grow  ${styles.mainText}`}
                    style={{ height: "162px", width: "162px", verticalAlign: "center" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : !movieData.isError ? (
                  movieData.data.map((item) => (
                    <div className="col-lg-3 col-6 justify-content-center " key={item.id}>
                      <MovieCard
                        data={item}
                        handleDelete={handleDelete}
                        setUpdate={setUpdate}
                        type="admin"
                      />
                    </div>
                  ))
                ) : (
                  //   console.log(movieData.msg)
                  <ErrorDiv data={movieData.msg} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pagination my-5 w-100 pe-5">
          <Pagination
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={movieData.pageInfo.totalPage ? movieData.pageInfo.totalPage : page}
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

export default ManageMovie;
