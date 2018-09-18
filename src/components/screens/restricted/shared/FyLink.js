import React from 'react';
import {Link} from 'react-router-dom';

export default class FyLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link {...this.props} to={(!!this.props.href)?this.props.href:'#'} />
    );
  }
}
