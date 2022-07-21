import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import cartReducer from './cartReducer';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import ordersReducer from './ordersReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  userInfo: userReducer,
  token: tokenReducer,
  loginInfo: loginReducer,
  orders: ordersReducer,
});

export default rootReducer;
