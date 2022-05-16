import axios from "../../utils/axios";

export const getUser = (id) => {
  return {
    type: "GET_USER",
    payload: axios.get(`user/${id}`)
  };
};

export const updateProfile = (form) => {
  return {
    type: "UPDATE_PROFILE",
    payload: axios.patch(`user/profile`, form)
  };
};

export const updateImage = (form) => {
  return {
    type: "UPDATE_IMAGE",
    payload: axios.patch(`user/image`, form)
  };
};

export const changePassword = (form) => {
  return {
    type: "UPDATE_PASSWORD",
    payload: axios.patch(`user/password`, form)
  };
};
