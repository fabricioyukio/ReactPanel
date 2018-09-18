import React from 'react';
import { connect } from 'react-redux';
import { addOneFlag, setLoginData, setSessionData } from "../../../redux/actions";
import { bindActionCreators } from 'redux';
import Page from '@atlaskit/page';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ProfessorPanel from "./professor/ProfessorPanel";
import StudentPanel from "./student/StudentPanel";
import Error401 from './../public/ErrorPage401';
import REQUESTER from "../../../services/api-requester";
import * as Config from '../../../constants/config';


class Restricted extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  tick = async () => {
    let options = {
      method: 'patch',
      url: '/user/keepalive',
      data: {"profile": "professor"},
      headers: {'X-Authorization': this.props.session_data.session_data.token}
    };
    let response = await REQUESTER(options);
    if (response.status < 300) {
      console.log("GOT UPDATE TOKEN", response.data);
      this.setState({classes: response.data.token})
    } else {
      console.log("DID NOT UPDATE TOKEN", response);
    }
  }

  componentDidMount() {
    if (this.checkCredentials()) {
      this.interval = setInterval(() => this.tick(), Config.API_TOKEN_UPDATE_INTERVAL);
    } else {
      this.props.history.push('/');
    }
  }


  checkCredentials = () => {
    console.log('CHECKING CREDENTIALS ', this.props.session_data);
    if ((!!this.props.session_data.session_data.token)) {
      if (this.props.session_data.session_data.token.length > 0) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
        <Route path="/professor" component={ProfessorPanel}/>
        <Route path="/aluno" component={StudentPanel}/>
        <Route path="/:other" component={Error401}/>
        </Switch>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  session_data: state.session_data,
  login_data: state.login_data,
  notification_flags: state.notification_flags
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({setLoginData, setSessionData, addOneFlag}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Restricted);
