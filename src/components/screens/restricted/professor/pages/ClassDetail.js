import React from 'react';
import { connect } from 'react-redux';
import Modal from '@atlaskit/modal-dialog';
import REQUESTER from "../../../../../services/professor-requests";
import FyLink from "../../shared/FyLink";
import Gravatar from "../../shared/Gravatar";
import Card from "../../shared/Card";
import AddIcon from '@atlaskit/icon/glyph/add';
import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import PersonIcon from '@atlaskit/icon/glyph/person';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import ToggleStateless from '@atlaskit/toggle';
import Form, { Field } from '@atlaskit/form';
import FieldText from '@atlaskit/field-text';
import FieldTextArea from '@atlaskit/field-text-area';
import Button from '@atlaskit/button';
import { bindActionCreators } from 'redux';
import { addOneFlag } from "../../../../../redux/actions";
import Select from '@atlaskit/select';
import EditorInfoIcon from '@atlaskit/icon/glyph/editor/info';


class ClassDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      the_class: false,
      class_id: props.match.params.class_id,
      isAddActivityModalOpen: false,
      isAddStudentModalOpen: false,
      isRequesting: false,
      isClassRequested: false,
      new_activity_title: '',
      new_activity_required: false,
      new_activity_description: '',
      new_activity_type: '',
      new_activity_types: [],
      new_student_name: '',
      new_student_email: ''
    };
  }


  /* NEW ACTIVITY BEGIN */
  handleActivityRequirement = () => {
    console.log('New State REQUIRED',this.state.new_activity_required);
    this.setState({ new_activity_required: !this.state.new_activity_required });
  };
  handleActivityType = (newValue, actionMeta) => {
    console.log('New Type',newValue.value);
    this.setState({new_activity_type: newValue.value});
  };
  handleActivityTitle = (event) => {
    this.setState({new_activity_title: event.target.value});
  };
  handleActivityDescription = (event) => {
    this.setState({new_activity_description: event.target.value});
  };
  handleAddActivity = () => {
    if (
      (this.state.new_activity_title.length > 5)
      && (this.state.new_activity_description.length > 6)
    ) {
      this.setState({isRequesting: true});
      let options = {
        method: 'post',
        data: {
          title: this.state.new_activity_title,
          description: this.state.new_activity_description,
          required: (this.state.new_activity_required)?1:0,
          type: this.state.new_activity_type
        },
        url: '/class/' + this.state.class_id + '/activity',
        headers: {'X-Authorization': this.props.session_data.token}
      };
      REQUESTER(options).then(response => {
        this.addFlag('Sucesso!', 'Uma nova ATIVIDADE foi adicionada à sala');
        this.getClass();
        this.handleAddActivityModal();
      }).catch(
        error => {
          console.log("Did not get CLASSES", error);
        }
      );
    }
  }
  handleAddActivityModal = () => {
    this.setState({isAddActivityModalOpen: !this.state.isAddActivityModalOpen});
  }

  /* NEW ACTIVITY END */


  /* NEW STUDENT BEGIN */
  handleStudentName = (event) => {
    this.setState({new_student_name: event.target.value});
  };
  handleStudentEmail = (event) => {
    this.setState({new_student_email: event.target.value});
  };
  handleAddStudent = () => {
    if (
      (this.state.new_student_name.length > 5)
      && (this.state.new_student_email.length > 6)
    ) {
      this.setState({isRequesting: true});
      let options = {
        method: 'post',
        data: {
          name: this.state.new_student_name,
          email: this.state.new_student_email
        },
        validateStatus: function (status) {
          return status < 300;
        },
        url: '/class/' + this.state.class_id + '/student',
        headers: {'X-Authorization': this.props.session_data.token}
      };
      REQUESTER(options).then(response => {
        this.addFlag('Sucesso!', 'Um novo aluno foi adicionado à sala');
        this.getClass();
        this.handleAddStudentModal();
      }).catch(
        error => {
          console.log("Did not get CLASSES", error);
        }
      );
    }
  }
  handleAddStudentModal = () => {
    this.setState({isAddStudentModalOpen: !this.state.isAddStudentModalOpen});
  }

  /* NEW STUDENT END */

  addFlag(ftitle, fcontent) {
    let flag_data = {
      title: ftitle,
      description: fcontent,
      icon: <EditorInfoIcon/>
    };
    this.props.addOneFlag(flag_data);
  }

  getClass = () => {

    let options = {
      method: 'get',
      url: '/class/' + this.state.class_id,
      headers: {'X-Authorization': this.props.session_data.token}
    };
    let response = REQUESTER(options).then(response => {
      console.log("GOT CLASS", response.data.class);
      this.setState({the_class: response.data.class});
      if(!!response.data.class.student_type){
        switch (response.data.class.student_type){
          case 'STUDENT_1':
            this.setState({ new_activity_types: [{ label: 'Linguagem', value: 'Linguagem' },]});
            break;
          default:
            this.setState({ new_activity_types: [
                { label: 'Escuta Autônoma', value: 'Escuta Autônoma' },
                { label: 'Escuta Compartilhada', value: 'Escuta Compartilhada' },
                { label: 'Leitura Autônoma', value: 'Leitura Autônoma' },
                { label: 'Leitura Compartilhada', value: 'Leitura Compartilhada' },
              ]});
            break;
        }
      }
    }).catch(
      error => {
        console.log("Did not get CLASSES", error);
      }
    );
  }


  componentDidMount() {
    this.getClass();
  }

  render() {


    return (
      <React.Fragment>
        {(this.state.the_class !== false) &&
        <div className="grid-y medium-grid-frame">
          <div className="cell shrink header">
            <div className="grid-x grid-padding-x">
              <div className="cell auto padding-2">
                <h5>Turma</h5>
                <h2>{this.state.the_class.name}</h2>

                <small>{this.state.the_class.code}</small>
                <small>{this.state.the_class.created_at}</small>
              </div>
              <div className="cell shrink padding-2">
                <Button iconBefore={<AddIcon/>} onClick={this.handleAddStudentModal}
                        appearance="primary"> Alunos </Button>
                &nbsp;
                <Button iconBefore={<AddIcon/>} onClick={this.handleAddActivityModal}
                        appearance="primary"> Atividades </Button>

              </div>
            </div>
          </div>
          <div className="cell auto cell-block-container">
            <div className="cell-block-y">
              <div className="padding-2">
                <h3><PeopleGroupIcon size="medium"/> Alunos</h3>
                <hr/>

                {(this.state.the_class.students.length > 0) ?
                  this.state.the_class.students.map((student, index) => (
                    <Card icon={<PersonCircleIcon size="small"/>} title={'Aluno-'+student.id} key={student.id}
                          style={{width: '320px'}}>
                      <div className="grid-x">
                        <div className="cell shrink"><Gravatar size="large" email={student.email}/></div>
                        <div className="cell auto">
                          <h4>{student.name}</h4>
                          <div><a href={'mailto:' + student.email}>{student.email}</a></div>
                        </div>
                      </div>
                    </Card>

                  )) : <p>Nenhum aluno nesta turma</p>}
              </div>
              <div className="padding-2">
                <h3><DocumentsIcon size="medium"/> Atividades</h3>
                <hr/>

                {(this.state.the_class.activities.length > 0) ?
                  this.state.the_class.activities.map((activity, index) => (
                    <Card icon={<DocumentsIcon size="small"/>} title={('Atividade-' + activity.id)} key={activity.id}
                          style={{width:'320px'}} href={'/professor/atividade/' + activity.id} >
                      <h4 style={{height:'70px'}}>{activity.title}</h4>
                      <hr />
                      <div style={{height:'32px',overflow:'hidden'}}>{activity.description}</div>
                    </Card>

                  )) : <p>Não há atividades</p>}
              </div>
            </div>
          </div>
        </div>

        }

        {(this.state.isAddActivityModalOpen) &&
        <Modal
          heading="Nova Atividade"
          actions={[ {text: 'SALVAR', onClick: this.handleAddActivity}, {
            text: 'Cancelar',
            onClick: this.handleAddActivityModal
          } ]}
          onClose={this.handleAddActivityModal}
        >
          <p>
            <Button onClick={this.handleActivityRequirement} appearance={(this.state.new_activity_required)?'primary':'default'}>Obrigatória</Button>
            <Button onClick={this.handleActivityRequirement} appearance={(this.state.new_activity_required)?'default':'primary'}>Eletiva</Button>
          </p>
          <Field><Select
            onChange={this.handleActivityType}
            style={{ zIndex: 9999 }}
            options={this.state.new_activity_types}
            placeholder="Selecione o Tipo"
          /></Field>
          <Field><FieldText onChange={this.handleActivityTitle} placeholder={'Título'} required shouldFitContainer/></Field>
          <Field><FieldTextArea onChange={this.handleActivityDescription} placeholder={'Descrição'}
                                required shouldFitContainer minimumRowsnumber={5} /></Field>

        </Modal>

        }

        {
          (this.state.isAddStudentModalOpen) &&
          <Modal
            heading="Novo Aluno"
            actions={[ {text: 'SALVAR', onClick: this.handleAddStudent}, {
              text: 'Cancelar',
              onClick: this.handleAddStudentModal
            } ]}
            onClose={this.handleAddStudentModal}
          >
            <Field label="Nome"><FieldText onChange={this.handleStudentName} required shouldFitContainer/></Field>
            <Field label="email"><FieldText onChange={this.handleStudentEmail} required shouldFitContainer/></Field>

          </Modal>
        }

      </React.Fragment>
    );

  }
}

const mapStateToProps = state => ({
  session_data: state.session_data.session_data
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({addOneFlag}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetail);
