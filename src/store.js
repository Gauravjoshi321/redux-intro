import { applyMiddleware, combineReducers, createStore } from "redux";

import AccountReducer from "./features/accounts/accountSlice";
import CustomerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;