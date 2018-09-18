import React from 'react';
import { connect } from 'react-redux';
import { CardFrame, IconImage } from '@atlaskit/media-ui';
import REQUESTER from '../../../../../services/professor-requests';
import * as Config from '../../../../../constants/config';
import FyLink from "../../shared/FyLink";
import Card from "../../shared/Card";
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import Warning from '@atlaskit/icon/glyph/warning';
import { bindActionCreators } from 'redux';
import { addOneFlag } from "../../../../../redux/actions";
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {classes: [], activities: [], gotClasses: false, gotActivities: false, seekingClasses:false, seekingActivities:false};

    this.getClasses();
    this.getActivities();
  }

  getClasses = () => {
    this.setState({ seekingClasses:true });
    if (!this.state.gotClasses) {
      let options = {
        method: 'get',
        url: '/dashboard',
        headers: {'X-Authorization': this.props.session_data.token}
      };
      let response = REQUESTER(options).then(
        response => {
          console.log("GOT CLASSES", response.data.classes);
          this.setState({gotClasses: true});
          this.setState({classes: response.data.classes});
          this.setState({ seekingClasses:false });
        },
        function () {
          this.setState({ seekingClasses:false });
          let flag_data = {
            title: "Erro ao processar TURMAS ",
            description: "Não foi possível acessar dados na API, por favor tente novamente mais tarde",
            icon: <Warning/>
          };
          this.props.addOneFlag(flag_data);
        }
      );
    }
  }


  getActivities = () => {
    if (!this.state.gotActivities) {
      this.setState({ seekingActivities:true });
      let options = {
        method: 'get',
        url: '/dashboard/activities',
        headers: {'X-Authorization': this.props.session_data.token}
      };
      let response = REQUESTER(options).then(
        response => {
          console.log("GOT ACTIVITIES", response.data.activities);
          this.setState({activities: response.data.activities})
          this.setState({gotActivities: true});
          this.setState({ seekingActivities:false });
        }, function () {
          let flag_data = {
            title: "Erro ao processar ATIVIDADES ",
            description: "Não foi possível acessar dados na API, por favor tente novamente mais tarde",
            icon: <Warning/>
          };
          this.setState({ seekingActivities:false });
          this.props.addOneFlag(flag_data);
        }
      );
    }
  }


  componentDidMount() {
  }


  render() {
    const DATE_OPTIONS = {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'};

    return (
      <React.Fragment>
        <div className="grid-y grid-frame">
          <div className="cell cell-block-container">
            <div className="padding-2">
              <h2>Bem vindo!</h2>
              <hr/>
            </div>
          </div>
          <div className="cell auto cell-block-container">
            <div className="cell-block-y">
              <div className="padding-2">
                <h3><PeopleGroupIcon size="large"/> Turmas</h3>
                <div>
                  {((!!this.state.classes) && (this.state.classes.length > 0)) ?
                    this.state.classes.map((a_class, index) => (

                      <Card icon={<PeopleGroupIcon size="small"/>} title={a_class.code} key={a_class.id}
                            style={{width:'320px'}} href={'/professor/turma/' + a_class.id} >
                        <h4>{a_class.name}</h4>
                        <div className="grid-x grid-margin-x">
                          <div className="cell">
                            <strong>{a_class.students.length}</strong> aluno{(a_class.students.length == 1) ? "" : "s"}
                          </div>
                          <div className="cell">
                            <strong>{a_class.activities.length}</strong> atividade{(a_class.activities.length == 1) ? "" : "s"}
                          </div>
                        </div>
                      </Card>


                    )) : (this.state.seekingClasses)? <Spinner size="xlarge"/> : <p>Nenhuma classe registrada</p> }
                </div>
              </div>
              <div className="padding-2">
                <h3><DocumentsIcon size="large"/> Atividades</h3>
                <div>
                  {((!!this.state.activities) && (this.state.activities.length > 0)) ?
                    this.state.activities.map(activity => (

                      <Card icon={<DocumentsIcon size="small"/>} title={'Atividade-'+activity.id} key={activity.id}
                            style={{width:'320px'}} href={'/professor/atividade/' + activity.id} >
                        <h4 style={{height:'70px'}}>{activity.title}</h4>
                        <hr />
                        <div style={{height:'32px',overflow:'hidden'}}>{activity.description}</div>
                        <hr />
                        <strong>{activity.participations.length}</strong>
                        {(activity.participations.length == 1) ? " Participação" : " Participações"}
                      </Card>

                    )) : (this.state.seekingActivities)? <Spinner size="xlarge"/> : <p>Nenhuma atividade encontrada</p> }
                    <div>
                      {((!!this.state.activities) && (this.state.activities.length > 0)) &&
                      <div>
                        <hr/>
                        <Button component={FyLink} href="/professor/atividades">VER MAIS ATIVIDADES</Button>
                      </div>
                      }
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  session_data: state.session_data.session_data
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({addOneFlag}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
