import {
  ADD_ITEM,
  CLEAR_CART,
  DECREMENT_ITEM,
  DECREMENT_PRODUCT_QTT,
  ICREMENT_ITEM,
  INCRERMENT_PRODUCT_QTT,
  REMOVE_ITEM,
  SET_CART_QTT,
  SET_CART_PRODUCTS,
  SET_PRODUCT_QTT,
} from '../actions';

const INITIAL_STATE = {
  products: [],
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  const rmQtt = (item) => (item.id === action.payload
    ? { ...item, quantity: item.quantity - 1 }
    : item);
  const addQtt = (item) => (item.id === action.payload
    ? { ...item, quantity: item.quantity + 1 }
    : item);
  const setQtt = (item) => (item.id === action.payload.id
    ? { ...item, quantity: action.payload.quantity }
    : item);
  switch (action.type) {
  case SET_CART_PRODUCTS:
    return { ...state, products: action.payload };
  case ADD_ITEM:
    return { ...state, cartItems: [...state.cartItems, action.payload] };
  case REMOVE_ITEM:
    return { ...state,
      cartItems: state.cartItems.filter((item) => item.id !== action.payload) };
  case ICREMENT_ITEM:
    return { ...state,
      products: state.products.map(addQtt),
      cartItems: state.cartItems.map(addQtt) };
  case DECREMENT_ITEM:
    return { ...state,
      products: state.products.map(rmQtt),
      cartItems: state.cartItems.map(rmQtt) };
  case DECREMENT_PRODUCT_QTT:
    return { ...state, products: state.products.map(rmQtt) };
  case INCRERMENT_PRODUCT_QTT:
    return { ...state, products: state.products.map(addQtt) };
  case CLEAR_CART:
    return { ...state, cartItems: [] };
  case SET_PRODUCT_QTT:
    return { ...state, products: state.products.map(setQtt) };
  case SET_CART_QTT:
    return { ...state, cartItems: state.cartItems.map(setQtt) };
  default:
    return state;
  }
};

export default cartReducer;
