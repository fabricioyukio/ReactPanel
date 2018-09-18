import React from 'react';
import Button from '@atlaskit/button';
import ChevronLeftCircleIcon from '@atlaskit/icon/glyph/chevron-left-circle';
// import Warning from '@atlaskit/icon/glyph/warning';
// import Icon from '@atlaskit/icon';
import Logo from '../../../assets/img/logo1.png';
import { setSessionData, resetAllFlags } from '../../../redux/actions';


export default  class Oops extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }


  render() {
    return (
      <React.Fragment>
        <div className="login-page-container">
          {/* LOGIN PAGE BEGIN */}
          <div className="login-page box-shadow Y200">

            <div className='grid-y grid-padding-y'>
              <div className="cell"><img src={Logo} alt="Colcha de Leituras"/></div>

              <div className="cell">
                <h2>OOps</h2>
                <p>Algo deu errado, verifique os dados inseridos e tente novamente.</p>
              </div>
              <div className="cell align-center">
                <Button
                iconBefore={<ChevronLeftCircleIcon primaryColor="#ffffff" secondaryColor="#000000"/>}
                href="/"
                appearance="primary"> NOVO ACESSO! </Button></div>
            </div>
          </div>
          {/* LOGIN PAGE END */}
        </div>
      </React.Fragment>
    );
  }
}
