import React from 'react';
import { connect } from 'react-redux';
import { Grid, GridColumn } from '@atlaskit/page';
import REQUESTER from '../../../../../services/student-requests';
import * as Config from '../../../../../constants/config';
import FyLink from "../../shared/FyLink";
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import Warning from '@atlaskit/icon/glyph/warning';
import { bindActionCreators } from 'redux';
import { addOneFlag } from "../../../../../redux/actions";
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import Card from "../../shared/Card";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {classes: [], activities: [], gotClasses:false, gotActivities:false};

  }

  getClasses = () => {
    if(!this.state.gotClasses) {
      let options = {
        method: 'get',
        url: '/dashboard',
        headers: {'X-Authorization': this.props.session_data.token}
      };
      let response = REQUESTER(options).then(
        response => {
          console.log("GOT CLASSES", response.data.classes);
          this.setState({gotClasses: true});
          this.setState({classes: response.data.classes})
        },
        function(){
          let flag_data={
            title: "Erro ao processar TURMAS ",
              description: "Não foi possível acessar dados na API, por favor tente novamente mais tarde",
            icon: <Warning/>
          };
          this.props.addOneFlag(flag_data);
        }
      );
    }
  }


  componentDidMount() {
    this.getClasses();
  }


  render() {
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };

    return (
      <React.Fragment>
        <div className="grid-y grid-frame ">
          <div className="cell cell-block-container">
            <div className="padding-2">
              <h2>Bem vindo!</h2>
              <hr/>
            </div>
          </div>
          <div className="cell cell-block-container auto">
            <div className="grid-x medium-grid-frame grid-padding-x">
              <div className="cell cell-block auto">
                <div className="list-container">
                  {((!!this.state.classes) && (this.state.classes.length > 0)) ?
                  this.state.classes.map((a_class, index) => (

                    <div key={a_class.id} className="list-item padding-2">
                      <h4><PeopleGroupIcon size="medium"/> Turma {a_class.name}</h4>
                      <h5>{a_class.code}</h5>
                      <div><strong>{a_class.activities.length}</strong> atividade{ (a_class.activities.length==1)?"":"s" }</div>
                      <div>
                      {
                        ((!!a_class.activities.length)&&(a_class.activities.length > 0)) ?
                        a_class.activities.map( (activity, aindex)=>(

                            <Card icon={<DocumentsIcon size="small"/>} title={'Atividade-'+activity.id} key={activity.id}
                            style={{width:'320px'}} href={'/aluno/atividade/' + activity.id} >
                              <h4 style={{height:'70px'}}>{activity.title}</h4>
                              <hr />
                              <div style={{height:'32px',overflow:'hidden'}}>{activity.description}</div>
                            </Card>

                        ) ) : <Spinner size="xlarge"/>
                      }
                      </div>
                    </div>

                  )) : <Spinner size="xlarge" /> }
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

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
