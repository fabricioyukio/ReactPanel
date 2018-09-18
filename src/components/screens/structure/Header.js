import React from 'react';
import Profile from "../restricted/shared/Profile";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cell medium-cell-block shrink">
        <header className="main">
          <div className="grid-x grid-padding-x">
            <div className="cell shrink">LOGO</div>
            <div className="cell auto">{this.props.children}</div>
            <div className="cell shrink"><Profile/></div>
          </div>
        </header>
      </div>
    );
  }
}
