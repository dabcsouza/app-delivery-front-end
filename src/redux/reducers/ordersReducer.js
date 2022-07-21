import { SET_ORDERS } from '../actions';

const INITIAL_STATE = {
  order: [],
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_ORDERS:
    return { ...state, order: action.payload };
  default:
    return state;
  }
};

export default ordersReducer;
