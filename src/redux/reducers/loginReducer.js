import { SET_IS_LOGGED_IN } from '../actions';

const INITIAL_STATE = {
  isLoggedIn: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_IS_LOGGED_IN:
    return { ...state, isLoggedIn: action.payload };
  default:
    return state;
  }
};

export default loginReducer;
