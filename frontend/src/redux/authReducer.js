const initialState = {
  username: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        username: action.payload.username,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        username: null,
      };
    default:
      return state;
  }
};

export default authReducer;
