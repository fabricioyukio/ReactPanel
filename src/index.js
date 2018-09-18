import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './redux/reducers';
import MainRouter from './modules/MainRouter';
import registerServiceWorker from './registerServiceWorker';
import { setLoginData, setSessionData, addOneFlag, dismissOneFlag } from "./redux/actions";

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <MainRouter />
  </Provider>,
  document.getElementById('app-root')
);
registerServiceWorker();


window.store = store;
window.addOneFlag = addOneFlag;
window.dismissOneFlag = dismissOneFlag;
