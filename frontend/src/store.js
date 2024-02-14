import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  tripReducer,
  tripDetailsReducer,
  tripDeleteReducer,
  tripCreateReducer,
  tripUpdateReducer,
  tripQuestionCreateReducer,
  tripQuestionDeleteReducer,
} from "./reducers/tripReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDelete,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderDeliverReducer,
  orderListReducer,
} from "./reducers/orderReducers";
import { categoryReducer } from "./reducers/categoryReducers";

const reducer = combineReducers({
  tripList: tripReducer,
  categoryList: categoryReducer,
  tripDetails: tripDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDelete,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  tripDelete: tripDeleteReducer,
  tripCreate: tripCreateReducer,
  tripUpdate: tripUpdateReducer,
  tripQuestionCreate: tripQuestionCreateReducer,
  tripQuestionDelete: tripQuestionDeleteReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const transactionAddressFromStorage = localStorage.getItem("transactionAddress")
  ? JSON.parse(localStorage.getItem("transactionAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    transactionAddress: transactionAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
