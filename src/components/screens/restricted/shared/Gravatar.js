import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@atlaskit/avatar';
import md5 from 'md5';


export default class Gravatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  static propTypes = {
    email: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small','medium','large','xlarge']),
  }

  static defaultProps = {
    size:'medium',
  }

  render() {
    const mailhash = md5(this.state.email);
    return (
      <React.Fragment><Avatar size="medium" {...this.props}
                src={"https://www.gravatar.com/avatar/"+mailhash+"?s=180"} /></React.Fragment>
    );
  }
}
