export const ADD_ITEM = 'ADD_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';
export const DECREMENT_PRODUCT_QTT = 'DECREMENT_PRODUCT_QTT';
export const ICREMENT_ITEM = 'ICREMENT_ITEM';
export const INCRERMENT_PRODUCT_QTT = 'INCRERMENT_PRODUCT_QTT';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS';
export const SET_CART_QTT = 'SET_CART_QTT';
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_PRODUCT_QTT = 'SET_PRODUCT_QTT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const SET_ORDERS = 'SET_ORDERS';

export const setProductQtt = (id, quantity) => ({
  type: SET_PRODUCT_QTT,
  payload: { id, quantity },
});

export const setCartQtt = (id, quantity) => ({
  type: SET_CART_QTT,
  payload: { id, quantity },
});

export const incrementProductQtt = (id) => ({
  type: INCRERMENT_PRODUCT_QTT,
  payload: id,
});

export const decrementProductQtt = (id) => ({
  type: DECREMENT_PRODUCT_QTT,
  payload: id,
});

export const clearShoppingCart = () => ({
  type: CLEAR_CART,
});

export const incrementCartItem = (id) => ({
  type: ICREMENT_ITEM,
  payload: id,
});

export const decrementCartItem = (id) => ({
  type: DECREMENT_ITEM,
  payload: id,
});

export const addCartItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeCartItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

export const setCartProducts = (payload) => ({
  type: SET_CART_PRODUCTS,
  payload,
});

export const setNewUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const setIsLoggedIn = (payload) => ({
  type: SET_IS_LOGGED_IN,
  payload,
});

export const setOrders = (payload) => ({
  type: SET_ORDERS,
  payload,
});
