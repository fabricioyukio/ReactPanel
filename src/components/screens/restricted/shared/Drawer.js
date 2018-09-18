import React from 'react';
import { connect } from 'react-redux';
import { AkCustomDrawer } from '@atlaskit/navigation';

import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';
import CreateIcon from '@atlaskit/icon/glyph/add';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';

export default class Drawer extends React.Component {

  state = {
    width: 'narrow',
    iconOffset: 100,
  };

  // setIconOffset = e => e.target.value && this.setState({ iconOffset: e.target.value });
  setWidthNarrow = () => this.setState({ width: 'narrow' });
  setWidthWide = () => this.setState({ width: 'wide' });
  setWidthFull = () => this.setState({ width: 'full' });
  render() {
    const { drawerIsOpen, closeDrawer } = this.props;
    const { width, iconOffset } = this.state;
    return (
      <AkCustomDrawer
        backIcon={<ArrowLeft label="Back" />}
        primaryIcon={<PersonCircleIcon label="Back" />}
        isOpen={drawerIsOpen}
        iconOffset={iconOffset || 0}
        width={width}
        onBackButton={closeDrawer}
        header="Meus dados">
        {this.props.children}
      </AkCustomDrawer>
    );
  }
}
