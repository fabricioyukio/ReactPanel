import React from 'react';
import * as CONFIG from '../../../constants/config';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Button from '@atlaskit/button';

export default class ErrorPage401 extends React.Component {
  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.history.go(-1);
  }

  render() {
    return (
      <React.Fragment>
        <div className="error-page-container">
          <div className="error-page text-left">
            <h1 className="col-R500">401</h1>
            <h3 className="col-N600">Você não possui autorização para acessar este recurso.</h3>
            <p>Suas permissões de usuário não permitem acesso a esse recurso</p>
            <p>Caso tenha necessidade de acesso para esse recurso, por favor informe nossa equipe através do e-mail: <strong>{CONFIG.SUPPORT_MAIL}</strong>.</p>
            <p>Agradecemos sua compreensão</p>
            <Button appearance="help" onClick={this.goBack} iconBefore={<ArrowLeftIcon />}>VOLTAR</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
