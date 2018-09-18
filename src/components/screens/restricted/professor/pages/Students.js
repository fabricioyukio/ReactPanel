import React from 'react';
import { connect } from 'react-redux';

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <React.Fragment>Estudantes</React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  // data: state.something
});

export default connect(mapStateToProps, null)(Students);
