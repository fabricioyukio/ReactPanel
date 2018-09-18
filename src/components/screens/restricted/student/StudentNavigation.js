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
import BaseNavigation from '../shared/BaseNAvigation';
import HomeFilledIcon from '@atlaskit/icon/glyph/home-filled';
import DocumentsIcon from '@atlaskit/icon/glyph/documents';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
// import PeopleIcon from '@atlaskit/icon/glyph/people';
// import MediaServicesSpreadsheetIcon from '@atlaskit/icon/glyph/media-services/spreadsheet';
// import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';


class StudentNavigation extends React.Component {
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

    this.handleProfile = this.handleProfile.bind(this);
  }


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
        isOpen={isOpen}
        width={width}
        globalPrimaryIcon={<Avatar onClick={this.handleProfile} size="large"
                                   src={this.props.session_data.user_avatar}
                                   appearance="circle"/>}
        globalTheme={{
          ...presetThemes.global,
          ...createGlobalTheme(colors.N0, colors.DN30)
        }}
        containerTheme={{
          ...presetThemes.global,
          ...createGlobalTheme(colors.N0, colors.T500)
        }}
      >
        <br/><br/>
        <div className="text-left">
          <AkNavigationItemGroup>
            <AkNavigationItem href={'/aluno'} text="Início" icon={(<HomeFilledIcon/>)}
                              label="Início" size="small" linkComponent={FyLink}/>
          </AkNavigationItemGroup>
          <AkNavigationItemGroup hasSeparator>
            <AkNavigationItem href={'/aluno/atividades'} text="Atividades" icon={(<DocumentsIcon/>)}
                              label="Atividades" size="small" linkComponent={FyLink}/>
          </AkNavigationItemGroup>
        </div>
      </BaseNavigation>
    );
  }
}


const mapStateToProps = state => ({
  session_data: state.session_data.session_data
});

export default connect(mapStateToProps, null)(StudentNavigation);
