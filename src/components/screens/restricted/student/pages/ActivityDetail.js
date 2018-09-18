import React from 'react';
import { connect } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import Button from '@atlaskit/button';
import Avatar from '@atlaskit/avatar';
import Modal from '@atlaskit/modal-dialog';
import REQUESTER from "../../../../../services/student-requests";
import FyLink from "../../shared/FyLink";
import Gravatar from "../../shared/Gravatar";
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import PersonIcon from '@atlaskit/icon/glyph/person';
import CommentIcon from '@atlaskit/icon/glyph/comment';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import Card from "../../shared/Card";
import AddIcon from '@atlaskit/icon/glyph/add';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';
import ImageIcon from '@atlaskit/icon/glyph/image';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import Tick from '@atlaskit/icon/glyph/check-circle';
import Dropzone from 'react-dropzone';
import FieldTextArea from '@atlaskit/field-text-area';
import * as CONFIG from "../../../../../constants/config";


class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      activity: false, activity_id: props.match.params.activity_id,
      isParticipationOpen:false,
      minPartText: 12, participation_text: '', participation_file: [], isRequesting:false
    };
  }

  addActivityParticipation = (form) => {
    this.setState({ isRequesting:true });
    let options = {
      method: 'post',
      url: '/activity/participate',
      data:form,
      headers: {'X-Authorization': this.props.session_data.token}
    };
    let response = REQUESTER(options).then(
      response => {
        this.setState({isParticipationOpen:false});
        return this.getActivity();
      });
  }

  handleParticpationModal = () => {
    this.setState({isParticipationOpen: !this.state.isParticipationOpen});
  };

  handleAddParticipation = () => {
    if(!(this.state.participation_text.length < this.state.minPartText)){

      const formData = new FormData();
      console.log("FILE", this.state.participation_file);
      let the_file = (!!this.state.participation_file[0])?this.state.participation_file[0]:null;
      console.log("THE_FILE", the_file);
      formData.append('activity_id',this.state.activity.id);
      formData.append('text',this.state.participation_text);
      if(the_file!==null){
        formData.append('partfile',the_file, the_file.name);
      }else{
        formData.append('partfile',false);
      }

      let participation = this.addActivityParticipation(formData);
      console.log('PARTICIPOU ', participation);
    }
  }

  handleTextInput = (event) => {
    this.setState({participation_text: event.target.value});
  };

  handleParticipationFile(participation_file) {
    console.log(participation_file);
    this.setState({
      participation_file
    });
    console.log('PARTICIPATION_FILE',this.state.participation_file);
  }


  getActivity = () => {
    let options = {
      method: 'get',
      url: '/activity/' + this.state.activity_id,
      headers: {'X-Authorization': this.props.session_data.token}
    };
    let response = REQUESTER(options).then( response => {
        console.log("GOT ACTIVITY", response.data.activity);
        this.setState({activity: response.data.activity})
      }
    ).catch(error => {
      console.log("Did not get ACTIVITY", error);
    });
  }

  componentDidMount() {
    this.getActivity();
  }

  render() {

    return (
      <React.Fragment>
        {(this.state.activity !== false) &&
        <div className="grid-y medium-grid-frame">
          <div className="cell shrink header padding-1">

            <h5>ATIVIDADE</h5>
            <h2>{this.state.activity.title}</h2>
            <div>{this.state.activity.description}</div>

          </div>
          <div className="cell medium-auto medium-cell-block-container">
            <div className="grid-x grid-margin-x">
              <div className="cell auto padding-1 cell-block-y medium-4">

                <h3>Material de apoio</h3>

                <h4>Livros</h4>
                <p><Button onClkick={this.handleBookModal} iconBefore={<AddIcon/>}> Livros</Button></p>

                <div className="list-container">
                  {(this.state.activity.books.length > 0) ? this.state.activity.books.map((book, index) => (
                    <div key={index} className="list-item padding-1">
                      <h5>{book.title}</h5>
                      <small>{book.collection}</small>
                      <div>{book.genre}</div>
                      <div>{book.description}</div>
                    </div>
                  )) : "Nenhum livro"}
                </div>
                <hr/>
                <h4>Arquivos</h4>
                <p><Button onClick={this.handleActFileModal} iconBefore={<AddIcon/>}> Arquivos</Button></p>

                <div className="list-container">
                  {(this.state.activity.files.length > 0) ? this.state.activity.files.map((file, index) => (
                    <Card icon={<AttachmentIcon size="small"/>} title={'Arquivo-'+ file.id}
                          key={file.id} width="100%" >
                      <div className="grid-x grid-margin-x">
                        <div className="cell shrink">
                          <Button appearance="subtle" target="_blank" href={CONFIG.MEDIA_URL + file.filename}
                                  iconBefore={<DownloadIcon size="xlarge"/>}></Button>
                        </div>
                        <div className="cell auto">
                          <h5>{file.name}</h5>
                          <div>{file.description}</div>
                        </div>
                      </div>
                    </Card>
                  )) : "Nenhum arquivo"}
                </div>

              </div>
              <div className="cell cell-block auto medium-cell-block-y medium-8">
                <div className="padding-2 list-container">
                  <h3><PeopleGroupIcon size="medium"/>Participações</h3>
                  <p>
                    <strong>{this.state.activity.participations.length}</strong> {(this.state.activity.participations.length == 1) ? 'participação' : 'participações'}
                  </p>
                  <p><Button iconBefore={<CommentIcon/>} onClick={this.handleParticpationModal}
                             appearance="primary"><strong>Participe!</strong></Button></p>

                  {(this.state.activity.participations.length > 0) ?
                    this.state.activity.participations.map((participation, index) => (

                      <Card icon={<CommentIcon size="small"/>} title={'Partipação-'+ participation.id}
                            key={participation.id} style={{width:'100%'}} >
                        <div className="grid-x grid-margin-x">
                          <div className="cell shrink"><Gravatar size={'large'} email={participation.student.email}/></div>
                          <div className="cell auto">
                            <div><p>{ participation.text.split('\n').map((item, key) => {
                              return <p key={key}>{item}</p>
                            }) }</p></div>
                            <p><small>por <strong>{participation.student.name}</strong></small></p>
                          </div>
                        </div>
                        {(participation.files.length > 0) &&
                        <div className="files">
                          <hr/> <h6>ANEXOS</h6>
                          {participation.files.map((file,index)=>(
                            <span key={file.id} style={{padding:'2px 3px'}}>
                              <Button href={ CONFIG.MEDIA_URL + file.filename } target="_blank"
                                      iconBefore={ (file.type.startsWith('image'))? <ImageIcon/> : <AttachmentIcon/> } >
                                Arquivo {(index+1)}
                              </Button></span>
                          ))}
                        </div>
                        }
                      </Card>
                    )) : "Nenhuma participação nesta atividade"}
                </div>
              </div>

            </div>
          </div>
        </div>

        }

        {
          (this.state.isParticipationOpen) &&
          <Modal width="large"
                 heading="Participar da Atividade"
                 actions={[
                   {
                     text: 'Participar',
                     onClick: this.handleAddParticipation
                   },
                   {
                     text: 'Cancelar',
                     onClick: this.handleParticpationModal
                   }
                 ]}
                 onClose={this.handleParticpationModal}
          >
            <div>
              <h4>{this.state.activity.title}</h4>

              <Dropzone onDrop={this.handleParticipationFile.bind(this)} multiple={false}
                        style={{
                          textAlign:'center',
                          width: 'auto', lineHeight:'40px', padding:'40px',
                          border:'1px solid #ccc', borderRadius:'3px',
                          backgroundColor:'efeff2',  }}>
                {
                  (this.state.participation_file.length > 0)?
                    this.state.participation_file.map(f => <div key={f.name}><strong>{f.name}</strong> - {f.size} bytes</div>)
                    :<div> Anexar arquivo à participação. </div>
                }
              </Dropzone>

              <Field label="Sua participação"><FieldTextArea name="partText" shouldFitContainer
                                                             onChange={this.handleTextInput}
                                                             minimumRows={5}
                                                             style={{height: '100%'}}
                                                             enableResize={'vertical'}/></Field>
            </div>

          </Modal>
        }

      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  session_data: state.session_data.session_data
});

export default connect(mapStateToProps, null)(ActivityDetail);
