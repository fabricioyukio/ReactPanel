import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import Button from '@atlaskit/button';
import StarIcon from '@atlaskit/icon/glyph/star';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';

export default class EvalScore extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
    onRatingClick: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf([ 'small', 'medium', 'large', 'xlarge' ]),
  }

  static defaultProps = {
    value: 0,
    onRatingClick() {
    },
    disabled: false,
    size: 'medium'
  }

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillMount() {
  }

  doAction = (val) => {
    val = (val > 1)? val : 1;
    val = (val < 5)? val : 5;
    this.setState({ value:val });
    console.log("TO GIVE NEW VALUE", this.refs.fieldvalue.name, val);
    this.props.onRatingClick({name: this.refs.fieldvalue.name, value:val });
  }

  render() {

    return (
      <React.Fragment>



        <div className="eval-score-container" style={{display:'inline-block'}}>
          <div className="padding-1">
            <label>{this.state.label}</label>
            <input type="hidden" ref="fieldvalue" name={this.state.name} value={this.state.value}
                                style={{display: 'none !important'}} min={this.min} max={this.max} readOnly/>
            <div>
              <Button iconBefore={(this.state.value > 0) ? <StarFilledIcon/> : <StarIcon/>} onClick={() => this.doAction(1)}
                      isDisabled={this.state.disabled} appearance='subtle' spacing='none' size={this.state.size}/>
              <Button iconBefore={(this.state.value > 1) ? <StarFilledIcon/> : <StarIcon/>} onClick={() => this.doAction(2)}
                      isDisabled={this.state.disabled} appearance='subtle' spacing='none' size={this.state.size}/>
              <Button iconBefore={(this.state.value > 2) ? <StarFilledIcon/> : <StarIcon/>} onClick={() => this.doAction(3)}
                      isDisabled={this.state.disabled} appearance='subtle' spacing='none' size={this.state.size}/>
              <Button iconBefore={(this.state.value > 3) ? <StarFilledIcon/> : <StarIcon/>} onClick={() => this.doAction(4)}
                      isDisabled={this.state.disabled} appearance='subtle' spacing='none' size={this.state.size}/>
              <Button iconBefore={(this.state.value > 4) ? <StarFilledIcon/> : <StarIcon/>} onClick={() => this.doAction(5)}
                      isDisabled={this.state.disabled} appearance='subtle' spacing='none' size={this.state.size}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
