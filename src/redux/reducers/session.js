import { SET_SESSION_DATA } from '../action-types';

const initialState = {
  session_data: {
    created_at : "",
    token : "",
    updated_at : "",
    user_avatar : "",
    user_first_name : "",
    user_id : 0,
    user_last_name : "",
    user_login : "",
    user_name : "",
    user_role : ""
  }
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_SESSION_DATA:
    console.log('SET_SESSION_DATA',action);
    return {
      ...state,
      session_data: action.data
    };
  default:
    return state;
  }
}
