import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@atlaskit/avatar';
import Navigation, {
  AkContainerLogo,
  AkNavigationItemGroup,
  AkSearchDrawer,
  AkNavigationItem,
  AkCustomDrawer,
  AkCreateDrawer,
  AkContainerTitle,
  presetThemes,
} from '@atlaskit/navigation';
import { createGlobalTheme } from "@atlaskit/navigation/dist/cjs/index";
import { colors } from "@atlaskit/theme/dist/cjs/index";
import Logo from '../../../../assets/img/logo-iface_white.png';
import EditorErrorIcon from '@atlaskit/icon/glyph/editor/error';
import { NavLink } from 'react-router-dom';
import FyLink from './FyLink';



/*
const themes = {
  global: {
    globalTheme: presetThemes.global,
    containerTheme: presetThemes.global,
  },
  container: {
    globalTheme: presetThemes.global,
    containerTheme: presetThemes.container,
  },
  settings: {
    globalTheme: presetThemes.settings,
    containerTheme: presetThemes.settings,
  },
  custom: {
    globalTheme: {
      ...presetThemes.global,
      ...createGlobalTheme(colors.T300, colors.P500),
    },
    containerTheme: {
      ...presetThemes.global,
      ...createGlobalTheme(colors.T300, colors.P400),
    },
  },
};
*/


const customTheme = {
  globalTheme: {
    ...presetThemes.global,
    ...createGlobalTheme(colors.T300, colors.P500),
  },
  containerTheme: {
    ...presetThemes.global,
    ...createGlobalTheme(colors.T300, colors.P400),
  },
};

const ContainerHeaderComponent = () => {
  <AkContainerLogo><img src={Logo}/></AkContainerLogo>
};

class BaseNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      isOpen: true,
      openDrawer: false,
      showIcon: false,
      compactItems: false,
      value: '',
      containerThemeName: 'container',
      globalThemeName: 'global',
      width: 304,
    };
  }

  closeDrawer = () => this.setState({openDrawer: false});

  navigationTitle(isCollapsed){
    return(
      <div>
        <AkContainerLogo>
          <img src={Logo} />
        </AkContainerLogo>
      </div>
    );
  }

  /*
  toggleNavCollapse = () => this.setState({ isOpen: !this.state.isOpen });
  setCompact = (e: { event: SyntheticEvent<any>, isChecked: boolean }) =>
    this.setState({ compactItems: e.isChecked });
  setShowIcon = (e: { event: SyntheticEvent<any>, isChecked: boolean }) =>
    this.setState({ showIcon: e.isChecked });
  */

  // handleResize = (pr: { isOpen: boolean, width: number }) => this.setState(pr);
  render() {
    const {
      isOpen,
      openDrawer,
      compactItems,
      showIcon,
      width,
      globalThemeName,
      containerThemeName,
    } = this.state;

    return (
      <Navigation
        { ...this.props}
        globalSecondaryActions={[<a href="/logout"><EditorErrorIcon size="large" primaryColor={'#ffffff'} secondaryColor={'#ff3300'} /></a>]}
        containerHeaderComponent={this.navigationTitle}
      >{this.props.children}</Navigation>
    );
  }
}


const mapStateToProps = state => ({
  session_data: state.session_data
});

export default connect(mapStateToProps, null)(BaseNavigation);
