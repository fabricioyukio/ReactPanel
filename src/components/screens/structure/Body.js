import React from 'react';

export default class Body extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cell medium-cell-block auto">{this.props.children}</div>
    );
  }
}
