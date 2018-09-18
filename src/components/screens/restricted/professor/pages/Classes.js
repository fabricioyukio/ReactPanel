import React from 'react';
import { connect } from 'react-redux';
import Modal from '@atlaskit/modal-dialog';
import REQUESTER from "../../../../../services/professor-requests-by-user";
import FyLink from "../../shared/FyLink";
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import Form, { Field } from '@atlaskit/form';
import FieldText from '@atlaskit/field-text';
import Select from '@atlaskit/select';
import AddIcon from '@atlaskit/icon/glyph/add';
import EditorInfoIcon from '@atlaskit/icon/glyph/editor/info';
import Button, {ButtonGroup} from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { bindActionCreators } from 'redux';
import { addOneFlag } from "../../../../../redux/actions";
import Card from "../../shared/Card";


class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      classes: [], isModalOpen: false, isClassModalOpen: false, showStudents: false, gotClasses: false,
      new_class_name:'',
      new_class_code:'',
      new_class_type:'',
    };
  }

  /* NEW CLASS BEGIN */
  handleAddClass = () => {
    if (
      (this.state.new_class_name.length > 2)
      && (this.state.new_class_code.length > 1)
      && (this.state.new_class_type.length > 5)
    ) {
      this.setState({isRequesting: true});
      let options = {
        method: 'post',
        data: {
          name: this.state.new_class_name,
          code: this.state.new_class_code,
          student_type: this.state.new_class_type
        },
        validateStatus : function (status) {
          return status < 300;
        },
        url: '/class',
        headers: {'X-Authorization': this.props.session_data.token}
      };
      REQUESTER(options).then(response => {
        this.addFlag('Sucesso!', 'Um nova turma foi criada');
        this.getClasses();
        this.handleClassModal();
      }).catch(
        error => {
          this.addFlag('Houve um problema', 'O servidor não atendeu à requisição. Tente novamente mais tarde.');
        }
      );
    }
  }

  addFlag(ftitle, fcontent) {
    let flag_data = {
      title: ftitle,
      description: fcontent,
      icon: <EditorInfoIcon/>
    };
    this.props.addOneFlag(flag_data);
  }

  handleClassType1 = () => {
    this.setState({new_class_type:'STUDENT_1'});
    console.log('STATE CHANGED',this.state.new_class_type)
  };
  handleClassType2 = () => {
    this.setState({new_class_type:'STUDENT_2'});
    console.log('STATE CHANGED',this.state.new_class_type)
  };
  handleClassType3 = () => {
    this.setState({new_class_type:'STUDENT_3'});
    console.log('STATE CHANGED',this.state.new_class_type)
  };
  handleClassName = (event) => {
    this.setState({new_class_name: event.target.value});
    console.log('STATE CHANGED',this.state.new_class_name)
  };
  handleClassCode = (event) => {
    this.setState({new_class_code: event.target.value});
    console.log('STATE CHANGED',this.state.new_class_code)
  };
  handleClassModal = () => {
    this.setState({ isClassModalOpen : !this.state.isClassModalOpen });
  }
  /* NEW CLASS END */



  getClasses = async () => {

    let options = {
      method: 'get',
      url: '/dashboard',
      headers: {'X-Authorization': this.props.session_data.token}
    };
    return REQUESTER(options).then( response => {
      console.log("GOT CLASSES", response.data.classes);
      this.setState({gotClasses: true});
      this.setState({classes: response.data.classes});

    } ).catch( error => {
      console.log("Did not get CLASSES", error);
    } );

  }


  componentWillMount() {
    this.getClasses();
  }


  render() {

    return (
      <React.Fragment>
        <div className="grid-y medium-grid-frame">
          <div className="cell shrink header">
            <div className="grid-x grid-margin-x">
              <div className="cell auto padding-2">
                <h2>Suas Turmas</h2>
              </div>
              <div className="cell shrink padding-2">
                <Button iconBefore={<AddIcon/>} onClick={this.handleClassModal}
                        appearance="primary"> Classe </Button>
              </div>
            </div>
            <hr/>
          </div>
          <div className="cell medium-auto medium-cell-block-container">
            <div className="padding-2 text-left list-container cell-block-y">
              <p>Clique em uma classe para interagir com os alunos e criar atividades!</p>
              {((!!this.state.classes) && (this.state.classes.length > 0)) ?
              this.state.classes.map(a_class => (
                <Card icon={<PeopleGroupIcon size="small"/>} title={a_class.code} key={a_class.id}
                      style={{width:'320px'}} href={'/professor/turma/' + a_class.id} >
                  <h4>{a_class.name}</h4>
                  <div>{a_class.created_at}</div>
                  <div className="grid-x grid-margin-x">
                    <div className="cell auto text-center">
                      <h4>{a_class.students.length}</h4>
                      <p>Aluno{(a_class.students.length == 1) ? "" : "s"}</p>
                    </div>
                    <div className="cell auto text-center">
                      <h4>{a_class.activities.length}</h4>
                      <p>Atividade{(a_class.activities.length == 1) ? "" : "s"}</p>
                    </div>
                  </div>
                </Card>

              )) : <Spinner size="xlarge" /> }
            </div>
          </div>
        </div>
        {
          (this.state.isClassModalOpen) &&
          <Modal
            heading="Nova Turma"
            actions={[ {text: 'SALVAR', onClick: this.handleAddClass}, {
              text: 'Cancelar',
              onClick: this.handleClassModal
            } ]}
            onClose={this.handleClassModal}
          >
            <Field label="Nome"><FieldText onChange={this.handleClassName} required shouldFitContainer/></Field>
            <Field label="Código"><FieldText onChange={this.handleClassCode} required shouldFitContainer/></Field>
            <Field label="Nível educacional">
              <div style={{lineHeight: '40px',textAlign:'center'}}>
                <Button onClick={this.handleClassType1}
                        isSelected={(this.state.new_class_type=='STUDENT_1')}> Educação Infantil</Button>
                &nbsp;
                <Button onClick={this.handleClassType2}
                        isSelected={(this.state.new_class_type=='STUDENT_2')}> Fundamental (Anos Iniciais)</Button>
                &nbsp;
                <Button onClick={this.handleClassType3}
                        isSelected={(this.state.new_class_type=='STUDENT_3')}> Fundamental (Anos Finais)</Button>
              </div>
            </Field>

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

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
