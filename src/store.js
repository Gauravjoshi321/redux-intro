import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer
});

const store = createStore(rootReducer);



// 2. Customer

