import React from 'react';
import { connect } from 'react-redux';
import Form, {Field, FieldGroup} from '@atlaskit/form';
import FieldText from '@atlaskit/field-text';
import Drawer from './Drawer';

// import professorRequester from '../../../../../services/professor-requester';

class MyDataDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.stare = {
      classes: [],
      form: {}
    }
  }

  componentWillMount() {
    this.getClasses();
  }
  getClasses(){
    return null;
  }


  handleFormSubmit(event){
    event.preventDefault();
  }

  render() {

    return (
      <Drawer {...this.props}>
        <h2>Dados Pessoais</h2>
        <h2>Mudar Senha</h2>
        <Form onSubmit={()=>this.handleFormSubmit}>
          <Field label="Seu nome"><FieldText
            type="text" onChange={this.onPwdChange} required shouldFitContainer
            placeholder="" name="name" value={this.state.session_data.user_name}
          /></Field>
          <Field label="Seu nome"><FieldText
            type="text" onChange={this.onPwdChange} required shouldFitContainer
            placeholder="" name="name" value={this.state.session_data.user_name}
          /></Field>
          <Field label="Seu nome"><FieldText
            type="text" onChange={this.onPwdChange} required shouldFitContainer
            placeholder="" name="name" value={this.state.session_data.user_name}
          /></Field>
        </Form>
      </Drawer>
    );
  }
}


const mapStateToProps = state => ({
  session_data: state.session_data,
  login_data: state.login_data,
});


export default connect(mapStateToProps, null)(MyDataDrawer);
