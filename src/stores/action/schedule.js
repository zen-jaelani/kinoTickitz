import axios from "../../utils/axios";

export const getData = (page, limit, location, sortValue, id) => {
  return {
    type: "GET_DATA_SCHEDULE",
    payload: axios.get(
      `schedule?page=${page}&limit=${limit}&searchLocation=${location}&sort=${sortValue}&searchMovieId=${id}`
    )
  };
};

export const postData = (form) => {
  return {
    type: "POST_DATA_SCHEDULE",
    payload: axios.post(`schedule`, form)
  };
};

export const updateData = (id, form) => {
  return {
    type: "UPDATE_DATA_SCHEDULE",
    payload: axios.patch(`schedule/${id}`, form)
  };
};

export const deleteData = (id) => {
  return {
    type: "DELETE_DATA_SCHEDULE",
    payload: axios.delete(`schedule/${id}`)
  };
};
