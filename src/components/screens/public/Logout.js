import React from 'react';
import Button from '@atlaskit/button';
import ChevronRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
// import Warning from '@atlaskit/icon/glyph/warning';
// import Icon from '@atlaskit/icon';
import Logo from '../../../assets/img/logo1.png';
import { setSessionData, resetAllFlags } from '../../../redux/actions';


export default  class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <React.Fragment>
        <div className="login-page-container">
          {/* PAGE BEGIN */}
          <div className="login-page box-shadow Y200">

            <div className='grid-y grid-padding-y'>
              <div className="cell"><img src={Logo} alt="Colcha de Leituras"/></div>

              <div className="cell">
                <h2>Desconetado</h2>
                <p>Volte em breve!</p>
                <p>Estaremos à sua espera.</p>
              </div>
              <div className="cell">
                <Button
                iconAfter={<ChevronRightCircleIcon primaryColor="#ffffff" secondaryColor="#000000"/>} shouldFitContainer
                href="/"
                appearance="primary"> Fazer LogOn </Button></div>
            </div>
          </div>
          {/* PAGE END */}
        </div>
      </React.Fragment>
    );
  }
}
