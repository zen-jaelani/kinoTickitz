import React, { useState, useEffect } from "react";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import { getDashboard } from "../../stores/action/booking";
import { getData as getMovie } from "../../stores/action/movie";
import { getData as getSchedule } from "../../stores/action/schedule";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const { dataDashboard } = useSelector((state) => state.booking);
  const movieData = useSelector((state) => state.movie);

  const [locationList, setLocationList] = useState([]);
  const [filterValue, setFilterValue] = useState({
    movie: "",
    premiere: "",
    location: ""
  });
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let chart = [];
  monthList.forEach((v, i) => {
    const search = dataDashboard.find((item) => item.Month == i + 1);

    if (search) {
      chart.push(search);
    } else {
      chart.push({ Month: i + 1, Total: 0 });
    }
  });
  console.log(console.log(chart));

  const data = {
    labels: monthList.map((data) => data),
    datasets: [
      {
        label: "Monthy earning",
        data: chart.map((data) => data.Total),
        borderColor: "#5F2EEA",
        tension: 0.4
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return "Rp." + value.toLocaleString();
          },
          color: "#999999"
        },
        grid: {
          color: "rgba(228, 228, 228, 0.2)",
          borderColor: "rgba(228, 228, 228, 0.2)"
        }
      },
      x: {
        ticks: {
          color: "#999999",
          padding: 20
        },
        grid: {
          color: "rgba(228, 228, 228, 0.2)",
          borderColor: "rgba(228, 228, 228, 0.2)"
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    navigate({
      pathname: "/dashboard",
      search: `?${createSearchParams(filterValue)}`
    });
  }, [filterValue]);
  const getData = async () => {
    try {
      const { movie, premiere, location } = filterValue;
      dispatch(getDashboard(movie, location, premiere))
        .then((res) => console.log("get dashboard success"))
        .catch((err) => console.log(err));

      dispatch(getSchedule(1, 100, "", "", "")).then((res) => {
        let location = res.value.data.data.map((i) => i.location);
        location = Array.from(new Set(location)).map((i) => i);
        setLocationList(location);
      });
      dispatch(getMovie(1, 100, "", ""));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(locationList);

  const filter = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    if (event.target.type == "select-one") {
      setFilterValue({ ...filterValue, [event.target.name]: event.target.value });
    }
    if (event.target.name == "form") {
      getData();
    }
  };
  console.log(filterValue);
  return (
    <>
      <Header></Header>
      <main className=" container-fluid  py-5 bg-light">
        <div className="container row mx-auto ">
          <div className="col-12 col-lg-10 " style={{ width: "934px" }}>
            <div>
              <h3 className="">Dashboard</h3>
              <div className="bg-white p-4">
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 ">
            <h3>Filtered</h3>
            <form className="bg-white p-3 px-4">
              <div className="form-group mt-4">
                <select
                  className="form-select border btn btn-lg "
                  type="text"
                  placeholder="Movie Name"
                  name="movie"
                  defaultValue={""}
                  onChange={(event) => filter(event)}
                >
                  <option value={""}>Select Movie</option>
                  {movieData.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mt-4">
                <select
                  className="form-select border btn btn-lg "
                  type="text"
                  placeholder="Movie Name"
                  name="premiere"
                  defaultValue={""}
                  onChange={(event) => filter(event)}
                >
                  <option value={""}>Select Premiere</option>
                  {["Ebu.Id", "CineOne21", "hiflix"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mt-4">
                <select
                  className="form-select border btn btn-lg "
                  type="text"
                  placeholder="Movie Name"
                  name="location"
                  defaultValue={""}
                  onChange={(event) => filter(event)}
                >
                  <option value={""}>Select Location</option>
                  {locationList.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={filter}
                  name="form"
                  className="btn btn-lg btn-primary shadow w-100"
                  style={{ backgroundColor: "#5f2eea" }}
                >
                  Filter
                </button>
                <button
                  type="reset"
                  className="btn btn-lg btn-primary bg-white shadow w-100 mt-4 mb-5"
                  style={{ borderColor: "#5f2eea", color: "#5f2eea" }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Dashboard;
