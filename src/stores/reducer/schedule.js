const initialState = {
  data: [],
  pageInfo: {},
  isLoading: false,
  isError: false,
  msg: ""
};

const schedule = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_SCHEDULE_PENDING":
      return {
        ...state,
        isError: false,

        isLoading: true
      };

    case "GET_DATA_SCHEDULE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,

        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
        msg: action.payload.data.msg
      };

    case "GET_DATA_SCHEDULE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data
      };

    case "GET_DATA_ID_SCHEDULE_PENDING":
      return {
        ...state,
        isError: false,

        isLoading: true
      };

    case "GET_DATA_ID_SCHEDULE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,

        data: action.payload.data.data[0],
        pageInfo: action.payload.data.pagination,
        msg: action.payload.data.msg
      };

    case "GET_DATA_ID_SCHEDULE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data
      };

    case "POST_DATA_SCHEDULE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false
      };

    case "POST_DATA_SCHEDULE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg
      };

    case "POST_DATA_SCHEDULE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data
      };

    case "UPDATE_DATA_SCHEDULE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false
      };

    case "UPDATE_DATA_SCHEDULE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg
      };

    case "UPDATE_DATA_SCHEDULE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data
      };

    case "DELETE_DATA_SCHEDULE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false
      };

    case "DELETE_DATA_SCHEDULE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg
      };

    case "DELETE_DATA_SCHEDULE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data
      };

    default:
      return state;
  }
};

export default schedule;
