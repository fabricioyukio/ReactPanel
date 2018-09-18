import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FieldText from '@atlaskit/field-text';
import { Field } from '@atlaskit/form';
import Button from '@atlaskit/button';
import ChevronRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import Error from '@atlaskit/icon/glyph/error';
import Info from '@atlaskit/icon/glyph/info';
import Tick from '@atlaskit/icon/glyph/check-circle';
// import Warning from '@atlaskit/icon/glyph/warning';
// import Icon from '@atlaskit/icon';
import Logo from '../../../assets/img/logo1.png';
import apiStartSession from '../../../services/session_start';
import { addOneFlag, setLoginData, setSessionData } from '../../../redux/actions';
import { Redirect } from 'react-router-dom';
import * as Config from '../../../constants/config';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      is_requesting_login: false,
      is_logged: false,
      u_login: '',
      password: ''
    };
    this.addFlags = this.addFlags.bind(this);
  }

  addFlags(flag_data) {
    this.props.addOneFlag(flag_data);
  }

  onLoginChange = (event) => {
    console.log(event.target.value);
    this.setState({u_login: event.target.value});
  };

  onPwdChange = (event) => {
    console.log(event.target.value);
    this.setState({password: event.target.value});
  };

  goGetSessionToken = async (event) => {
    this.setState({is_requesting_login: true});
    // this.addFlags({
    //   description:"Enviando dados de acesso ao servidor para verificação de identidade...",
    //   icon: <Info />
    // });
    let req_data = await apiStartSession({
      login: this.state.u_login,
      password: this.state.password
    });
    if (!!req_data.status) {
      if (req_data.status === 201) {
        this.props.setLoginData({
          login: this.state.u_login,
          password: this.state.password
        });
        this.props.setSessionData(req_data.data.access_token);
        let params = {
          title: "Olá " + req_data.data.access_token.user_first_name,
          description: "Seja bem vindo ao COLCHA DE LEITURAS ONLINE",
          icon: <Tick/>
        };
        this.addFlags(params);

        this.setState({is_requesting_login: false});
        this.setState({
          is_logged: true
        });
        let user_role = Config.DEFS.user_type[ req_data.data.access_token.user_role ];
        console.log("REDIRECT TO", user_role);
        this.props.history.push(("/" + user_role));
      } else {
        console.log('LogOn FAIL :', req_data.status);
        let params = {
          title: "Erro ao tentar fazer LogOn",
          description: "Verifique seus dados para acesso ou se a tecla CAPS LOCK não foi acionada por acidente.",
          icon: <Error/>
        };
        this.addFlags(params);
      }
    }else{
      console.log('Server FAIL :', req_data.status);
      let params = {
        title: "Erro ao enviar reqisição ao servidor",
        description: "No momento, nosso ervidor não está respondendo. Por favor tente novamente mais tarde.",
        icon: <Error/>
      };
      this.addFlags(params);
    }
  };

  render() {
    // console.log('-------- HISTORY --------',this.props.router);
    return (
      <React.Fragment>
        <div className="login-page-container">
          {/* LOGIN PAGE BEGIN */}
          <div className="login-page box-shadow">

            <div className='grid-y grid-padding-y'>
              <div className="cell"><img src={Logo} alt="Colcha de Leituras"/></div>

              <div className="cell">
                <Field label="Login"><FieldText
                  onChange={this.onLoginChange}
                  type=""
                  required shouldFitContainer
                  placeholder="Seu login..."
                  name="login"
                /></Field>


                <Field label="Senha"><FieldText
                  type="password"
                  onChange={this.onPwdChange}
                  required shouldFitContainer
                  placeholder="Sua senha..."
                  name="example-text"
                  width="100%"
                /></Field>
              </div>
              <div className="cell"><Button
                iconAfter={<ChevronRightCircleIcon primaryColor="#ffffff" secondaryColor="#000000"/>} shouldFitContainer
                onClick={this.goGetSessionToken}

                appearance="primary"> ACESSAR </Button></div>


            </div>
          </div>
          {/* LOGIN PAGE END */}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
