import { COMMON_ACTION } from "../../constants/actions";

const INITIAL_STATE = {
  hasBackButton: false,
  userId: localStorage.getItem('_userId'),
  username: localStorage.getItem('_username'),
  errorMessage: null,
  title: '',
};

function appReducer(
  state = INITIAL_STATE,
  action,
) {
  switch(action.type) {
    case COMMON_ACTION.SET_BACK_BUTTON:
      const { hasBackButton } = action.payload;
      return { ...state, hasBackButton };
    case COMMON_ACTION.SET_USER_DATA:
      const { userId, username } = action.payload;
      return { ...state, userId, username };
    case COMMON_ACTION.SET_ERROR_MESSAGE:
      const { errorMessage } = action.payload;
      return { ...state, errorMessage };
    case COMMON_ACTION.SET_TITLE:
      const { title } = action.payload;
      return { ...state, title };
    default:
      return state;
  }
}

export default appReducer;
