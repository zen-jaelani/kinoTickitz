import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../stores/action/user";

function Header() {
  const [user, setUser] = useState({});
  const [searchState, setSearchState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataUser = useSelector((state) => state.auth);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log(dataUser);
      if (dataUser.data.id) {
        dispatch(getUser(dataUser.data.id)).then((res) => setUser(res.value.data.data));
      }
    } catch (error) {
      console.log(error, error.response);
    }
  };

  const showSearch = () => {
    if (!searchState) {
      setSearchState(true);
    } else {
      setSearchState(false);
    }
  };
  const search = (event) => {
    setSearchValue(event.target.value);
  };

  const enter = (event) => {
    console.log(event.key);
    console.log(searchValue);
    if (event.key == "Enter") {
      navigate("/all", { state: searchValue });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    location.reload();
  };

  return (
    <>
      <header>
        <div
          className={`navbar navbar-expand-lg navbar-light bg-white fixed-top py-4 ${styles.customNavbar}`}
        >
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src={require("../../assets/image/Tickitz 1.png")} alt="" className="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-expanded="false"
              aria-controls="navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
              <div className="d-flex flex-column flex-lg-row border-2 w-100">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 order-1 order-lg-0">
                  {user.role == "admin" ? (
                    <>
                      <button
                        className={`btn btn-block border-bottom border-top btn-lg mt-4 ${styles.navBtn}`}
                      >
                        <Link to="/dashboard" className="text-black">
                          Dashboard
                        </Link>
                      </button>

                      <button
                        className={`btn btn-block border-bottom border-top btn-lg mt-4 ${styles.navBtn}`}
                      >
                        <Link to="/manage/movie" className="text-black">
                          Manage Movie
                        </Link>
                      </button>

                      <button
                        className={`btn btn-block border-bottom border-top btn-lg mt-4 ${styles.navBtn}`}
                      >
                        <Link to="/manage/schedule" className="text-black">
                          Manage Schedule
                        </Link>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={`btn btn-block border-bottom border-top btn-lg mt-4 ${styles.navBtn}`}
                      >
                        <Link to="/" className="text-black">
                          Home
                        </Link>
                      </button>
                      <button className={`btn btn-block btn-lg border-bottom ${styles.navBtn}`}>
                        <Link to="/all" className="text-black">
                          List Movie
                        </Link>
                      </button>
                    </>
                  )}
                </ul>

                <ul
                  className={`navbar-nav w-100 align-items-center justify-content-end px-md-5 ${
                    user.id ? "d-flex" : "d-none"
                  }`}
                >
                  {/* <form className="form-inline pt-5 pt-md-0 order-0 pe-md-4"> */}
                  <div className="md-form my-0">
                    <div className="input-group">
                      <input
                        className={`form-control mr-sm-2 d-block  ${
                          searchState ? "d-lg-block" : "d-lg-none"
                        }`}
                        type="text"
                        placeholder="Search"
                        onChange={search}
                        onKeyDownCapture={enter}
                      />
                      <div className="btn d-none d-lg-block" onClick={showSearch}>
                        <i className="bi bi-search"></i>
                      </div>
                    </div>
                  </div>
                  {/* </form> */}
                  <div className="dropdown">
                    <a
                      className="invisible"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={
                          user.image
                            ? `${process.env.REACT_APP_IMG_URL}${user.image}`
                            : `${process.env.REACT_APP_IMG_URL}default-profile.jpg`
                        }
                        alt=""
                        className={`d-none d-lg-block visible ${styles.profileImage}`}
                      />{" "}
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li>
                        <button className="dropdown-item" onClick={() => navigate("/profile")}>
                          Profile
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </ul>

                <ul className={`navbar-nav order-3 ${!user.id ? "d-block" : "d-none"}`}>
                  <button
                    className={`btn btn-block btn-lg text-white w-100 ${styles.mainBg}`}
                    style={{ width: "100px" }}
                  >
                    <Link to="/auth/login" className="text-white">
                      Sign In
                    </Link>
                  </button>
                </ul>

                <span className="mx-auto pt-4 order-last d-block d-md-none">
                  © 2020 Tickitz. All Rights Reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
