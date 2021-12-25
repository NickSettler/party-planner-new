export const actionTypes = {
  SET_USER_ID: "SET_USER_ID",
  SET_USER_TOKEN: "SET_USER_TOKEN",
};

export const setUserId = (id: string) => ({
  type: actionTypes.SET_USER_ID,
  payload: { id },
});

export const setUserToken = (token: string) => ({
  type: actionTypes.SET_USER_TOKEN,
  payload: { token },
});
