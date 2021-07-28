import { COMMON_ACTION } from "../../constants/actions"

export function setBackButton(hasBackButton) {
  return {
    type: COMMON_ACTION.SET_BACK_BUTTON,
    payload: { hasBackButton }
  };
}

export function showErrorMessage(errorMessage) {
  return dispatch => {
    dispatch({
      type: COMMON_ACTION.SET_ERROR_MESSAGE,
      payload: { errorMessage }
    });
    const intervalId = setInterval(() => {
      dispatch({
        type: COMMON_ACTION.SET_ERROR_MESSAGE,
        payload: { errorMessage: null }
      });
      clearInterval(intervalId);
    }, 2000);
  }
}

export function setTitle(title) {
  return {
    type: COMMON_ACTION.SET_TITLE,
    payload: { title }
  };
}

export function login(userId, username) {
  return {
    type: COMMON_ACTION.SET_USER_DATA,
    payload: { userId, username }
  };
}

export function logout() {
  return {
    type: COMMON_ACTION.SET_USER_DATA,
    payload: { userId: null, username: null }
  };
}
