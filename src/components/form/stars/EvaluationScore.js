import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import Button from '@atlaskit/button';
import StarIcon from '@atlaskit/icon/glyph/star';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';

export default class Stars extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value:PropTypes.number,
    onRatingClick: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small','medium','large','xlarge']),
    min: PropTypes.number,
    max: PropTypes.number
  }

  static defaultProps = {
    step: 1,
    value:0,
    size:'medium',
    onRatingClick() {},
    disabled: false,
    size: 50,
    min: 0,
    max: 5
  }

  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      stars : []
    };
  }

  componentWillMount() {
    let i = 0;
    let cstars = [];
    for(i=0;i<this.props.max;i++) {
      cstars = [cstars, i+1];
    }
    this.setState({ stars : cstars });
  }

  render() {

    return (
      <React.Fragment>
        <input type="hidden" ref="fieldvalue"
               name={this.props.name}
               value={this.props.value}
               style={{display: 'none !important'}}
               min={this.min}
               max={this.max}
               readOnly />

          <label>{this.props.label}</label>
        {
          ((this.state.stars.length > 0))&&
          this.state.stars.map((star,index)=>{
            <Button spacing="none" key={index} appearance="subtle"
                    iconBefore={((index < this.props.value)?
                      <StarIcon size={this.props.size} />
                      : <StarFilledIcon size={this.props.size} />)}>aaa</Button>
          })
        }

      </React.Fragment>
    );
  }
}
