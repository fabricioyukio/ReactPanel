import React from 'react';
import { connect } from 'react-redux';
import Modal from '@atlaskit/modal-dialog';
import REQUESTER from "../../../../../services/professor-requests";
import FyLink from "../../shared/FyLink";
import Card from "../../shared/Card";
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
// import DocumentsIcon from '@atlaskit/icon/glyph/documents';

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = { activities:[], isModalOpen:false, showStudents:false, gotActivities:false, seekingActivities:false };
  }

  getActivities = async () => {
      this.setState({seekingActivities: true});
      let options = {
        method: 'get',
        url: '/activities',
        headers: {'X-Authorization': this.props.session_data.token}
      };
      REQUESTER(options).then( response => {
        console.log("GOT ACTIVITIES", response.data.activities);
        this.setState({gotActivities: true});
        this.setState({activities: response.data.activities});
        this.setState({seekingActivities: false});
      }).catch( error => {
        console.log("Did not get ACTIVITIES", error);
        this.setState({seekingActivities: false});
      } );

  }

  componentDidMount() {
    this.getActivities();
  }


  render() {

    return (
      <React.Fragment>
        <div className="grid-y medium-grid-frame">
          <div className="cell shrink header">
            <div className="padding-2">
              <h2>Suas Atividades</h2>
              <hr />
            </div>
          </div>
          <div className="cell cell-block-container auto">
            <div className="padding-2 text-left list-container cell-block-y">

              {((!!this.state.activities) && (this.state.activities.length > 0)) ?
              this.state.activities.map( activity => (
                <Card icon={<DocumentsIcon size="small"/>} title={'Atividade-'+activity.id} key={activity.id}
                      style={{width:'100%'}} href={'/professor/atividade/' + activity.id} >
                  <h5>{activity.title}</h5>
                  <div className="grid-x grid-margin-x">
                    <div className="cell auto">
                      {activity.description}
                    </div>
                    <div className="cell shrink text-center">
                      <h4>{ activity.participations.length }</h4>
                      <p>{ (activity.participations.length === 1)?"Participação":"Participações" }</p>
                    </div>
                  </div>
                </Card>
              )) : (this.state.seekingActivities)?<Spinner size="xlarge" />: <p>Nenhuma atividade registrada.</p> }
            </div>
          </div>
        </div>

        {
          this.state.isModalOpen && (
            <Modal
              heading="Candy bar"
              actions={[{ text: 'Exit candy bar', onClick: this.hideModal }]}
              onClose={this.hideModal}
            >

            </Modal>
          )
        }

      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  session_data: state.session_data.session_data
});

export default connect(mapStateToProps, null)(Activities);
