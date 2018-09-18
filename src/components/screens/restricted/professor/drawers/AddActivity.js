import React from 'react';
import { connect } from 'react-redux';
import Drawer from '../../shared/Drawer';
import Form, {Field, FieldGroup} from '@atlaskit/form';
import FieldText from '@atlaskit/field-text';

// import professorRequester from '../../../../../services/professor-requester';

class addActivity extends React.Component {
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
        <h2>Criar Atividade</h2>
        <Form onSubmit={this.handleFormSubmit}>
          <Field label="Atividade"><FieldText
            type=""
            onChange={this.onPwdChange}
            required shouldFitContainer
            placeholder="A default value"
            name="example-text"
            width="100%" value={null}
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


export default connect(mapStateToProps, null)(addActivity);
