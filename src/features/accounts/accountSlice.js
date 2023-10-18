import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false
}

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {

    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // requestLoan: {
    //   prepare(loanAmount, loanPurpose) {
    //     return { payload: { loanAmount, loanPurpose } }
    //   },
    //   reducer(state, action) {
    //     if (state.loan > 0) return;
    //     state.balance += action.payload.loanAmount;
    //     state.loan = action.payload.loanAmount;
    //     state.loanPurpose = action.payload.loanPurpose;
    //   }
    // }
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.balance += action.payload.loanAmount;
      state.loan = action.payload.loanAmount;
      state.loanPurpose = action.payload.loanPurpose;
    }
  },
  payLoan(state) {
    state.balance -= state.loan;
    state.loan = 0;
    state.loanPurpose = "";
  }
});


export default accountSlice.reducer;

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;


export function deposit(amount, currency) {
  if (currency === "USD")
    return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {

    // API Call
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    const data = await res.json();

    // return action
    dispatch({ type: "account/deposit", payload: data.rates.USD })
  }

}

// export default function AccountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit": {
//       return { ...state, balance: state.balance + action.payload }
//     }
//     case "account/withdraw": {
//       return { ...state, balance: state.balance - action.payload }
//     }
//     case "account/requestLoan": {
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         balance: state.balance + action.payload.amount,
//         loanPurpose: action.payload.purpose
//       };
//     }
//     case "account/payLoan": {
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: ""
//       }
//     }

//     default: {
//       return state
//     }
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD")
//     return { type: "account/deposit", payload: amount };

//   return async function (dispatch, getState) {

//     // API Call
//     const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
//     const data = await res.json();

//     // return action
//     dispatch({ type: "account/deposit", payload: data.rates.USD })
//   }

// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount }
// }

// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } }
// }

// export function payLoan() {
//   return { type: "account/payLoan" }
// }

