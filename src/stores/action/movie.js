import axios from "../../utils/axios";

export const getData = (page, limit, sortValue, searchValue) => {
  return {
    type: "GET_DATA_MOVIE",
    payload: axios.get(
      `movie?page=${page}&limit=${limit}&sort=${sortValue}&searchName=${searchValue}`
    )
  };
};

export const getDataId = (id) => {
  return {
    type: "GET_DATA_ID_MOVIE",
    payload: axios.get(`movie/${id}`)
  };
};

export const postData = (form) => {
  return {
    type: "POST_DATA_MOVIE",
    payload: axios.post(`movie`, form)
  };
};

export const updateData = (id, form) => {
  return {
    type: "UPDATE_DATA_MOVIE",
    payload: axios.patch(`movie/${id}`, form)
  };
};

export const deleteData = (id) => {
  return {
    type: "DELETE_DATA_MOVIE",
    payload: axios.delete(`movie/${id}`)
  };
};
