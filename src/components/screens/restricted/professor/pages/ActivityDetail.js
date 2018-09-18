import React from 'react';
import { connect } from 'react-redux';
import Form, { Field } from '@atlaskit/form';
import FieldText from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import Avatar from '@atlaskit/avatar';
import Modal from '@atlaskit/modal-dialog';
import REQUESTER from "../../../../../services/professor-requests";
import EvalScore from "../../../../form/stars/EvalScore";
import * as CONFIG from "../../../../../constants/config";
import FyLink from "../../shared/FyLink";
import Gravatar from "../../shared/Gravatar";
import Card from "../../shared/Card";
import AddIcon from '@atlaskit/icon/glyph/add';
import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import PersonIcon from '@atlaskit/icon/glyph/person';
import CommentIcon from '@atlaskit/icon/glyph/comment';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';
import ImageIcon from '@atlaskit/icon/glyph/image';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import Tick from '@atlaskit/icon/glyph/check-circle';
import Dropzone from 'react-dropzone';
import FieldTextArea from '@atlaskit/field-text-area';
import { addOneFlag } from '../../../../../redux/actions';
import { bindActionCreators } from "redux";

const Book = (the_book) =>(
  <div className="book"><div className='cover'><a className="info"><div>
    <h6>{the_book.title}</h6>
    <div>{the_book.description}</div>
  </div></a></div></div>
);


class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      activity: false, activity_id: props.match.params.activity_id,
      minPartText: 12, participation_text: '', participation_file: [], isRequesting: false,
      actualParticipation: false, isEvaluationOpen: false,
      isParticipationOpen: false, participation_eval_scores:[], participation_eval_score:3,
      isActFileOpen: false, actfile_file:[], actfile_name:'', actfile_description:'',
      isBookModalOpen: false, book_id:0, booksfound:[]
    };
  }
  addFlag(flag_data) {
    this.props.addOneFlag(flag_data);
  }

  /* BOOKS BEGIN */
  addBook = (formData) => {
    this.setState({isRequesting: true});
    let options = {
      method: 'post',
      url: '/activityfile',
      data: formData,
      headers: {'X-Authorization': this.props.session_data.token,'Content-Type':'multipart/form-data'}
    };
    let response = REQUESTER(options).then(
      response => {
        this.setState({isActFileOpen: false});
        let params = {
          title: "! Sucesso ",
          description: "O arquivo foi adicionado com sucesso à Atividade",
          icon: <Tick/>
        };
        this.addFlag(params);
        return this.getActivity();
      });
  };

  handleBookModal = () => {
    this.setState({ isBookModalOpen: !this.state.isBookModalOpen });
  };
  handleBookSave = () => {

      const formData = new FormData();
      formData.append('activity_id',this.state.activity.id);
      formData.append('book_id',this.state.book_id);
      let book = this.addBook(formData);
      console.log('ENVIOU BOOK', book);
  };
  handleBookSelection = (event) => {
    this.setState({book_description: event.target.value});
  };

  /* BOOKS END */


  /* ACTIVITY FILE BEGIN */
  addActivityFile = (formData) => {
    this.setState({isRequesting: true});
    let options = {
      method: 'post',
      url: '/activityfile',
      data: formData,
      headers: {'X-Authorization': this.props.session_data.token,'Content-Type':'multipart/form-data'}
    };
    let response = REQUESTER(options).then(
      response => {
        this.setState({isActFileOpen: false});
        let params = {
          title: "! Sucesso ",
          description: "O arquivo foi adicionado com sucesso à Atividade",
          icon: <Tick/>
        };
        this.addFlag(params);
        return this.getActivity();
      });
  };
  handleActFileModal = () => {
    this.setState({ isActFileOpen: !this.state.isActFileOpen });
  };
  handleActFileSave = () => {
    if (!(this.state.actfile_description.length < this.state.minPartText)) {
      const formData = new FormData();
      let the_file = this.state.actfile_file[0];
      console.log("FILE", this.state.actfile_file);
      console.log("THE_FILE", the_file);
      formData.append('activity_id',this.state.activity.id);
      formData.append('name',this.state.actfile_name);
      formData.append('description',this.state.actfile_description);
      formData.append('file',the_file, the_file.name);

      let actfile = this.addActivityFile(formData);
      console.log('ENVIOU ACTFILE ', actfile);
    }
  };
  handleActFileDrop = (actfile_file) => {
    console.log(actfile_file);
    this.setState({
      actfile_file
    });
    console.log('PARTICIPATION_FILE',this.state.actfile_file);
  }
  handleActFileName = (event) => {
    this.setState({actfile_name: event.target.value});
  }
  handleActFileDescription = (event) => {
    this.setState({actfile_description: event.target.value});
  }

  /* ACTIVITY FILE END */


  /*  EVALUATION BEGIN  */

  handleEvaluation = () => {
    let eval_scores = [];
    console.log('SCORES TO EVAL',this.state.participation_eval_scores);

    let formData = new FormData();
    formData.append('activity_id',this.state.activity.id);
    formData.append('student_id',this.state.actualParticipation.user_id);
    formData.append('type',this.state.activity.type);

    let fdata={};

    fdata['activity_id']=this.state.activity.id;
    fdata['student_id']=this.state.actualParticipation.user_id;
    fdata['participation_id']=this.state.actualParticipation.id;
    fdata['type']=this.state.activity.type;

    for( let index in this.state.participation_eval_scores ){
      let score = this.state.participation_eval_scores[index];
      console.log('SCORE',score);
      formData.append(score.name, score.value);
      fdata[score.name]=score.value;
    }

    let options = {
      method: 'post',
      url: '/participation/'+(this.state.actualParticipation.id)+'/evaluate',
      data: formData,
      headers: {'X-Authorization': this.props.session_data.token}
    };
    let response = REQUESTER(options).then(
      response => {
        this.setState({isEvaluationOpen: false});
        return this.getActivity();
      });

  };

  handleEvaluationScoreLoad = (participation) => {
    /* handles evaluation to a participation */
    let scores = [];
    let scorestypes = CONFIG.DEFS.activity_evaluation_criteria[participation.user.role];
    for(let i=0;i<scorestypes.length;i++){
      scores[i]={ name: scorestypes[i], value:3 };
    };
    console.log('INITIAL SCORES',scores);
    this.setState({actualParticipation: participation, isEvaluationOpen: true, participation_eval_scores: scores});
  }

  handleEvaluationModal = () => {
    this.setState({isEvaluationOpen: !this.state.isEvaluationOpen});
  }

  handleEvalScore = (scoreField) => {
    let scores = this.state.participation_eval_scores;
    let the_sum = 0;
    for(let i=0; i< scores.length; i++){
      if(scores[i].name == scoreField.name){
        scores[i].value = parseInt(scoreField.value,10);
      }
      the_sum = the_sum + parseInt(scores[i].value,10);
    }
    the_sum = (the_sum / scores.length).toLocaleString(navigator.language, { minimumFractionDigits: 2 });
    this.setState({ participation_eval_scores : scores, participation_eval_score: the_sum });
  }

  /*  EVALUATION END  */

  /*  PARTICIPATION BEGIN  */

  addActivityParticipation = (formData) => {
    this.setState({isRequesting: true});
    let options = {
      method: 'post',
      url: '/activity/participate',
      data: formData,
      headers: {'X-Authorization': this.props.session_data.token,'Content-Type':'multipart/form-data'}
    };
    let response = REQUESTER(options).then(
      response => {
        this.setState({isParticipationOpen: false});
        return this.getActivity();
      });
  };


  handleAddParticipation = () => {
    if (!(this.state.participation_text.length < this.state.minPartText)) {
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
  };

  handleParticpationModal = () => {
    this.setState({isParticipationOpen: !this.state.isParticipationOpen});
  };

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

  /*  PARTICIPATION END  */

  getActivity = () => {
    let options = {
      method: 'get',
      url: '/activity/' + this.state.activity_id,
      headers: {'X-Authorization': this.props.session_data.token}
    };
    let response = REQUESTER(options).then(response => {
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
    let actions=[];
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
                          key={file.id} style={{width:'100%'}} >
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
                          <div className="cell shrink"><Gravatar size={'large'} email={participation.user.email}/></div>
                          <div className="cell auto">
                            <div><p>{ participation.text.split('\n').map((item, key) => {
                              return <p key={key}>{item}</p>
                            }) }</p></div>
                            <p><small>por <strong>{participation.user.name}</strong></small></p>
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
                        { (participation.user.role == 'STUDENT_1'
                            || participation.user.role == 'STUDENT_2'
                            || participation.user.role == 'STUDENT_3')
                          &&
                          <React.Fragment>
                            {(participation.evaluations.length < 1) ?
                              <React.Fragment>
                                <hr/>
                                <Button onClick={() => this.handleEvaluationScoreLoad(participation)}
                                        appearance="default">Avaliar</Button>
                              </React.Fragment>
                              :
                              <React.Fragment>
                                <hr/>
                                <strong>Avaliação:</strong>
                                {participation.evaluations.map((evaluation, eindex)=>(
                                  <div style={{ display:"inline-block", padding:'3px 7px' }} key={evaluation.id+'-'+eindex}>
                                    <strong>{evaluation.average_score.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</strong>
                                    {" ( "}
                                    { (evaluation.average_score < CONFIG.DEFS.activity_evaluation_criteria_THRESOLD[participation.user.role].MED)?
                                      <span>{CONFIG.DEFS.activity_evaluation_criteria_levels[participation.user.role].MIN}</span>
                                      :(evaluation.average_score < CONFIG.DEFS.activity_evaluation_criteria_THRESOLD[participation.user.role].MAX)?
                                        <span>{CONFIG.DEFS.activity_evaluation_criteria_levels[participation.user.role].MED}</span>
                                        : <span>{CONFIG.DEFS.activity_evaluation_criteria_levels[participation.user.role].MAX}</span>
                                    }
                                    {" ) "}
                                  </div>
                                ))}
                              </React.Fragment>
                            }
                          </React.Fragment>
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
          (this.state.isEvaluationOpen) &&
          <Modal
            heading="Avaliar Participação"
            actions={[ {text: 'AVALIAR', onClick: this.handleEvaluation}, {
              text: 'Cancelar',
              onClick: this.handleEvaluationModal
            } ]}
            onClose={this.handleEvaluationModal}
          >
            <p><strong>{this.state.actualParticipation.user.name}</strong> disse:</p>
            <div>
              <pre>{this.state.actualParticipation.text}</pre>
            </div>

            <hr/>
            <h4>Avaliar Participação ({(this.state.participation_eval_score).toLocaleString(navigator.language, { minimumFractionDigits: 2 })})</h4>
            <div>{ (this.state.participation_eval_scores.length > 0) &&
              this.state.participation_eval_scores.map((score,index) => (
                <span key={index}>
                  <EvalScore size="medium" onRatingClick={this.handleEvalScore} label={score.name}
                             name={score.name} value={3} disabled={false} />
                </span>
              ))}
            </div>



          </Modal>
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
        {
          (this.state.isActFileOpen) &&
          <Modal width="large"
                 heading="Adicionar arquivo para Atividade"
                 actions={[
                   {
                     text: 'Enviar',
                     onClick: this.handleActFileSave
                   },
                   {
                     text: 'Cancelar',
                     onClick: this.handleActFileModal
                   }
                 ]}
                 onClose={this.handleActFileModal}
          >
            <div>
              <Dropzone onDrop={this.handleActFileDrop.bind(this)} multiple={false}
                        style={{
                          textAlign:'center',
                          width: 'auto', lineHeight:'40px', padding:'40px',
                          border:'1px solid #ccc', borderRadius:'3px',
                          backgroundColor:'efeff2',  }}>
                {
                  (this.state.actfile_file.length > 0)?
                    this.state.actfile_file.map(f => <div key={f.name}><strong>{f.name}</strong> - {f.size} bytes</div>)
                    :<div> Selecione um arquivo. </div>
                }
              </Dropzone>

              <Field label="Título"><FieldText name="actfile_name" shouldFitContainer
                                                             onChange={this.handleActFileName}
                                                             style={{height: '100%'}}/></Field>
              <Field label="Descrição"><FieldTextArea name="actfile_descr" shouldFitContainer
                                                             onChange={this.handleActFileDescription}
                                                             minimumRows={5}
                                                             style={{height: '100%'}}
                                                             enableResize={'vertical'}/></Field>
            </div>

          </Modal>
        }
        {
          (this.state.isBookModalOpen) &&
          <Modal width="large"
                 heading="Adicionar Livro para Atividade"
                 actions={[
                   {
                     text: 'Enviar',
                     onClick: this.handleBookSave
                   },
                   {
                     text: 'Cancelar',
                     onClick: this.handleBookModal
                   }
                 ]}
                 onClose={this.handleBookModal}
          >
            <div className="grid-y">
              <div className="cell cell-block-y">
                { (this.state.booksfound.length > 0) &&
                  this.state.booksfound.map((book, index)=>(
                  <Book />
                ))
                }
              </div>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({addOneFlag}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail);
