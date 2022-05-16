import axios from "../../utils/axios";

export const getBookingUser = (id) => {
  return {
    type: "BOOKING_USER",
    payload: axios.get(`booking/user/${id}`)
  };
};

export const getBooking = (id) => {
  return {
    type: "GET_BOOKING",
    payload: axios.get(`booking/id/${id}`)
  };
};

export const getDashboard = (movieId, location, premiere) => {
  return {
    type: "GET_DASHBOARD",
    payload: axios.get(
      `booking/dashboard?movieId=${movieId}&location=${location}&premiere=${premiere}`
    )
  };
};
