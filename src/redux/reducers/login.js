import { SET_LOGIN_DATA } from '../action-types';

const initialState = {
  login_data: {}
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_LOGIN_DATA:
    return {
      ...state,
      login_data: action.data
    };
  default:
    return state;
  }
}
