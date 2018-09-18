import React from 'react';

export default class Base extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid-container main full App">
        <div className="grid-y medium-grid-frame">{this.props.children}</div>
      </div>
    );
  }
}
