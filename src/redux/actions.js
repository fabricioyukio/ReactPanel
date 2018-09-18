export const setLoginData = login_data => ({ type: "SET_LOGIN_DATA", data: login_data });

export const setSessionData = session_data => ({ type: "SET_SESSION_DATA", data: session_data });

export const addOneFlag = flag => ({ type: "ADD_FLAG", data: flag });
export const dismissOneFlag = remove_id => ({ type: "DISMISS_FLAG", flag_id: remove_id });
export const resetAllFlags = () => ({ type: "DISMISS_FLAG" });
