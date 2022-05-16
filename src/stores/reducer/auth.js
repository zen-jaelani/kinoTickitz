const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: ""
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return {
        ...state,
        isError: false,

        isLoading: true
      };

    case "LOGIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,

        data: action.payload.data.data,
        msg: action.payload.data.msg
      };

    case "LOGIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data
      };

    default:
      return state;
  }
};

export default auth;
