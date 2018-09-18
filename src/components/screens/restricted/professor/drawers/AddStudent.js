import React from 'react';
import { connect } from 'react-redux';
import Drawer from '../../shared/Drawer';
import Form, {Field, FieldGroup} from '@atlaskit/form';
import FieldText from '@atlaskit/field-text';

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <Drawer {...this.props}>
        <h2>Cadastrar Aluno</h2>
        <Form onSubmit={this.handleFormSubmit}>
          <Field label="Atividade"><FieldText
            type=""
            onChange={this.onPwdChange}
            required shouldFitContainer
            placeholder="A default value"
            name="example-text"
            width="100%" value={this.state.form.atividade}
          /></Field>
        </Form>
      </Drawer>
    );
  }
}


const mapStateToProps = state => ({
  // data: state.something
});

export default connect(mapStateToProps, null)(AddStudent);
