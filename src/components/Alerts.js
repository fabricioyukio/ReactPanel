import React from 'react';
import { connect } from 'react-redux';
import { addOneFlag, dismissOneFlag } from '../redux/actions';
import Flag, { FlagGroup } from '@atlaskit/flag';
import { bindActionCreators } from "redux";

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  onFlagDismissed = (dismissedFlagId) => {
    this.props.dismissOneFlag(dismissedFlagId);
  }


  render() {

    if((!!this.props.notification_flags) && (this.props.notification_flags.length > 0)){
      return (
        <React.Fragment>
          <FlagGroup id="system-flags" onDismissed={this.onFlagDismissed}>
            {/**/
              ((!!this.props.notification_flags) && (this.props.notification_flags.length > 0)) &&
              this.props.notification_flags.map(flag => (
                <Flag {...flag} />
              ))
              /* */}
          </FlagGroup>
        </React.Fragment>
      );
    }else{
      return (
        <React.Fragment></React.Fragment>
      );
    }

  }
}


const mapStateToProps = state => ({
  notification_flags: state.notification_flags.notification_flags
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({addOneFlag, dismissOneFlag}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
