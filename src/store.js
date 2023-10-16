import { combineReducers, createStore } from "redux";


///////////////////////////////////////////////
// INITIALSTATES

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
}

const initialStateCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: ""
}

////////////////////////////////////////////////////////////////////
// AllReducers

function AccountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit": {
      return { ...state, balance: state.balance + action.payload }
    }
    case "account/withdraw": {
      return { ...state, balance: state.balance - action.payload }
    }
    case "account/requestLoan": {
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose
      };
    }
    case "account/payLoan": {
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: ""
      }
    }

    default: {
      return state
    }
  }
}

function CustomerReducer(state = initialStateCustomer, action) {
  switch (action.type) {

    case "customer/createCustomer": {
      return {
        fullname: action.payload.fullname,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt
      }
    }

    case "customer/updateName": {
      return {
        ...state,
        fullname: action.payload
      }
    }

    default: {
      return state
    }
  }
}

////////////////////////////////////////////////////////////////////
// RootReducer and Store

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer
});

const store = createStore(rootReducer);


//////////////////////////////////////////////////////////////////////
// All Action creators and dispatches


// 1. Account

function deposit() {
  return { type: "account/deposit", payload: 700 };
}
store.dispatch(deposit());
console.log(store.getState());


function withdraw() {
  return { type: "account/withdraw", payload: 200 }
}
store.dispatch(withdraw());
console.log(store.getState());


function requestLoan() {
  return { type: "account/requestLoan", payload: { amount: 500, purpose: "Buy a guitar" } }
}
store.dispatch(requestLoan());
console.log(store.getState());


function payLoan() {
  return { type: "account/payLoan", payload: 200 }
}
store.dispatch(payLoan());
console.log(store.getState());


// 2. Customer

function createCustomer(fullname, nationalID) {
  return { type: "customer/createCustomer", payload: { fullname, nationalID, createdAt: new Date().toISOString() } }
}
store.dispatch(createCustomer("Gaurav Joshi", "232323"));
console.log(store.getState());

function updateCustomer(fullname) {
  return { type: "customer/updateName", payload: fullname }
}
store.dispatch(updateCustomer("Sanjay Joshi"));
console.log(store.getState());
