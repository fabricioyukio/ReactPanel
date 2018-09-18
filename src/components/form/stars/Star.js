import React from 'react';
import StarIcon from '@atlaskit/icon/glyph/star';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import PropTypes from 'prop-types';

export default class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  static propTypes = {
    active: PropTypes.bool,
    size: PropTypes.oneOf(['small','medium','large','xlarge']),
  }

  static defaultProps = {
    active: false,
    size: 'medium'
  }

  render() {

    return (
      <React.Fragment>
        <span>{ (this.state.is_active)?<StarFilledIcon size={this.props.size}/>:<StarIcon size={this.props.size}/>}</span>
      </React.Fragment>
    );
  }
}
