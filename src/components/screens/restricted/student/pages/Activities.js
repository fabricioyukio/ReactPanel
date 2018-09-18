import React from 'react';
import { connect } from 'react-redux';
import Modal from '@atlaskit/modal-dialog';
import REQUESTER from "../../../../../services/professor-requests";
import FyLink from "../../shared/FyLink";
// import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = { activities:[], isModalOpen:false, showStudents:false, gotActivities:false };
  }

  getActivities = async () => {

      let options = {
        method: 'get',
        url: '/activities',
        headers: {'X-Authorization': this.props.session_data.token}
      };
      REQUESTER(options).then( response => {
        console.log("GOT ACTIVITIES", response.data.activities);
        this.setState({gotActivities: true});
        this.setState({activities: response.data.activities});
      }).catch( error => {
        console.log("Did not get ACTIVITIES", error);
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
            <div className="padding-2 text-left list-container">

              {((!!this.state.activities) && (this.state.activities.length > 0)) &&
              this.state.activities.map( activity => (
                <div  key={activity.id} className="list-item padding-2">
                  <h3><PeopleGroupIcon size="medium" /> {activity.title}</h3>
                  <div className="grid-x grid-margin-x">
                    <div className="cell auto">
                      <div><FyLink href={'/professor/atividade/'+ activity.id}>+ detalhes</FyLink></div>
                      {activity.description}
                    </div>
                    <div className="cell auto text-center">
                      <h4>{ activity.participations.length }</h4>
                      <p>{ (activity.participations.length === 1)?"Participação":"Participações" }</p>
                    </div>
                  </div>
                </div>
              ))}
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
