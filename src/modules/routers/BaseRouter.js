import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../../components/screens/public/Login';
import App from '../App';

export default class BaseRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment><Router><Switch>
        <Route exact path="/" component={Login} />
        <Route path="/" component={App} />
      </Switch></Router></React.Fragment>
    );
  }
}
