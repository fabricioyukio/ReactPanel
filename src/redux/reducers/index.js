import { combineReducers  } from 'redux';
import { sessionReducer } from "./session";
import { loginReducer } from "./login";
import { flagReducer } from "./flag";

const Reducers = combineReducers({
  session_data:sessionReducer, login_data:loginReducer, notification_flags:flagReducer
});

export default Reducers;
