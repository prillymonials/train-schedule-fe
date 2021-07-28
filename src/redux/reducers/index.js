import { combineReducers } from 'redux';
import appReducer from './app';

const reducer = combineReducers({
  app: appReducer,
});

export default reducer;
