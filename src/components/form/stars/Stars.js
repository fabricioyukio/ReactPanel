import React from 'react';
import Star from './Star';

export default class Stars extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    totalStars: React.PropTypes.number.isRequired,
    rating: React.PropTypes.number,
    onRatingClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['small','medium','large','xlarge']),
    minRating: React.PropTypes.number,
    maxRating: React.PropTypes.number
  }

  static defaultProps = {
    step: 1,
    totalStars: 5,
    rating: 0,
    size:'medium',
    onRatingClick() {},
    disabled: false,
    size: 50,
    minRating: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      size: props.size
    };
  }

  STAR = () =>{
    stars = [];
    for(i=0;i<this.props.totalStars;i++) {
      stars[] = <Star  />;
    }

  };

  render() {

    return (
      <React.Fragment>
        <input type="hidden"
               name={this.props.name}
               value={this.state.currentRatingVal}
               style={{display: 'none !important'}}
               min={this.min}
               max={this.max}
               readOnly />
      </React.Fragment>
    );
  }
}
