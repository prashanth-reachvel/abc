export const loginSuccess = (username) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      username,
    },
  };
};

export const logoutSucess = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};
