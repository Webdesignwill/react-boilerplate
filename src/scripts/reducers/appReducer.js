import {
  APP_TYPE
} from "../types"

const initialState = {
  feelings: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case APP_TYPE: {
      return {
        ...state
      }
    }

    default:
      return state
  }
}
