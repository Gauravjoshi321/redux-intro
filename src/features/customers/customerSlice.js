const initialStateCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: ""
}

export default function CustomerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullname, nationalID) {
  return { type: "customer/createCustomer", payload: { fullname, nationalID, createdAt: new Date().toISOString() } }
}

export function updateCustomer(fullname) {
  return { type: "customer/updateName", payload: fullname }
}

