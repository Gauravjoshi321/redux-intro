const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
}

export default function AccountReducer(state = initialStateAccount, action) {
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

export function deposit() {
  return { type: "account/deposit", payload: 700 };
}

export function withdraw() {
  return { type: "account/withdraw", payload: 200 }
}

export function requestLoan() {
  return { type: "account/requestLoan", payload: { amount: 500, purpose: "Buy a guitar" } }
}

export function payLoan() {
  return { type: "account/payLoan", payload: 200 }
}

