import { combineReducers, createStore } from "redux";

import AccountReducer from "./features/accounts/accountSlice";
import CustomerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer
});

const store = createStore(rootReducer);

export default store;