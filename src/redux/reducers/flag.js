import { ADD_FLAG, DISMISS_FLAG, RESET_FLAG } from '../action-types';

const initialState = {
  counter: 2,
  notification_flags: []
};

export const flagReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLAG:
      console.log('Reducer ADD_FLAG', action);
      return {
        ...state,
        notification_flags: [{
          id:'flag-'+Date.now().toString(),
          key:(state.counter),
          ...action.data
        },...state.notification_flags], counter:(state.counter+1)
      };
    case DISMISS_FLAG:
      console.log('Reducer DISMISS_FLAG', action,state.notification_flags);
      return {
        ...state,
        notification_flags:state.notification_flags.filter(aflag => aflag.id !== action.flag_id)
      };
    case RESET_FLAG:
      console.log('Reducer RESET_FLAG');
      return {
        ...state,
        notification_flags:[]
      };
    default:
      return state;
  }
}
