const initialState = {
  data: [],
  dataDashboard: [],
  isLoading: false,
  isError: false,
  msg: ""
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case "BOOKING_USER_PENDING":
      return {
        ...state,
        isError: false,

        isLoading: true
      };

    case "BOOKING_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,

        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
        msg: action.payload.data.msg
      };

    case "BOOKING_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data
      };

    case "GET_BOOKING_PENDING":
      return {
        ...state,
        isError: false,

        isLoading: true
      };

    case "GET_BOOKING_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,

        data: action.payload.data.data,
        msg: action.payload.data.msg
      };

    case "GET_BOOKING_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data
      };

    case "GET_DASHBOARD_PENDING":
      return {
        ...state,
        isError: false,
        isLoading: true
      };

    case "GET_DASHBOARD_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataDashboard: action.payload.data.data,
        msg: action.payload.data.msg
      };

    case "GET_DASHBOARD_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataDashboard: [],
        pageInfo: {},
        msg: action.payload.response.data
      };

    default:
      return state;
  }
};

export default booking;
