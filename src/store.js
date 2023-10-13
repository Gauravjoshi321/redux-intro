import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
}

function reducer(state = initialState, action) {
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

const store = createStore(reducer);

console.log(store.getState());

// store.dispatch({ type: "account/deposit", payload: 700 })

// store.dispatch({ type: "account/withdraw", payload: 200 })
// console.log(store.getState());

// store.dispatch({ type: "account/requestLoan", payload: { amount: 500, purpose: "Buy a guitar" } })
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" })
// console.log(store.getState());

// console.log(store);

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
