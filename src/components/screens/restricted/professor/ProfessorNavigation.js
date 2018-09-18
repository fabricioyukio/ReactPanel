import React from 'react';
import { connect } from 'react-redux';
// import { NavLink, BrowserRouter, Link } from 'react-router-dom';
import Navigation, {
  AkNavigationItemGroup,
  AkNavigationItem,
  presetThemes,
} from '@atlaskit/navigation';
import { createGlobalTheme } from "@atlaskit/navigation/dist/cjs/index";
import { colors } from "@atlaskit/theme/dist/cjs/index";
import FyLink from '../shared/FyLink';
import Avatar from "@atlaskit/avatar";
// import AddClass from './drawers/AddClass';
import AddActivity from './drawers/AddActivity';
// import AddStudent from './drawers/AddStudent';
// import Logo from '../../../../assets/img/logo-iface_white.png';
import BaseNavigation from '../shared/BaseNAvigation';
// import ArrowRightCircleIcon from '@atlaskit/icon/glyph/arrow-right-circle';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
// import PeopleIcon from '@atlaskit/icon/glyph/people';
// import MediaServicesSpreadsheetIcon from '@atlaskit/icon/glyph/media-services/spreadsheet';
// import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';


class ProfessorNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.state = {
      isOpen: true,
      openDrawer: false,
      showIcon: true,
      compactItems: false,
      value: '',
      width: 304,
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  closeDrawer = () => this.setState({openDrawer: false});

  openDrawer(drawername) {
    console.log('OPEN DRAWER ', drawername);
    this.setState({openDrawer: drawername});
  }


  /*
  toggleNavCollapse = () => this.setState({ isOpen: !this.state.isOpen });
  setCompact = (e: { event: SyntheticEvent<any>, isChecked: boolean }) =>
    this.setState({ compactItems: e.isChecked });
  setShowIcon = (e: { event: SyntheticEvent<any>, isChecked: boolean }) =>
    this.setState({ showIcon: e.isChecked });
  */

  // handleResize = (pr: { isOpen: boolean, width: number }) => this.setState(pr);

  // drawers() {
  //   return ([
  //     <AddActivity drawerIsOpen={this.state.openDrawer === 'myDataDrawer'}
  //                  closeDrawer={this.closeDrawer}/>,
  //     <AddActivity drawerIsOpen={this.state.openDrawer === 'professorActivityDrawer'}
  //                  closeDrawer={this.closeDrawer}/>,
  //   ]);
  // }

  // openDrawer(drawername) {
  //   this.setState({openDrawer: drawername});
  // }
  //
  // closeDrawer() {
  //   this.setState({openDrawer: 'none'});
  // }

  handleProfile() {
    this.openDrawer('myDataDrawer');
  }

  render() {
    const {
      isOpen,
      // openDrawer,
      // compactItems,
      // showIcon,
      width,
      // globalThemeName,
      // containerThemeName,
    } = this.state;
    return (
      <BaseNavigation
        // drawers={this.drawers}
        isOpen={isOpen}
        width={width}
        globalPrimaryIcon={<Avatar onClick={this.handleProfile} size="large"
                                   src={this.props.session_data.user_avatar}
                                   appearance="circle"/>}
        linkComponent={FyLink}
        globalPrimaryItemHref="/professor/profile"

        globalTheme={{
          ...presetThemes.global,
          ...createGlobalTheme(colors.N0, colors.DN30)
        }}
        containerTheme={{
          ...presetThemes.global,
          ...createGlobalTheme(colors.N0, colors.P400)
        }}
      >
        <br/><br/>
        <div className="text-left">
          <AkNavigationItemGroup>
            <AkNavigationItem href={'/professor'} text="Início" icon={(<HomeFilledIcon/>)}
                              label="Início" size="small" linkComponent={FyLink}/>
          </AkNavigationItemGroup>
          <AkNavigationItemGroup title={'Funções do Professor'} hasSeparator>
            <AkNavigationItem href={'/professor/atividades'} text="Atividades" icon={(<DocumentsIcon/>)}
                              label="Atividades" size="small" linkComponent={FyLink}/>
            <AkNavigationItem href={'/professor/turmas'} text="Turmas" icon={(<PeopleGroupIcon/>)}
                              label="Turmas" size="large" linkComponent={FyLink}/>
          </AkNavigationItemGroup>
        </div>
      </BaseNavigation>
    );
  }
}


const mapStateToProps = state => ({
  session_data: state.session_data.session_data
});

export default connect(mapStateToProps, null)(ProfessorNavigation);
