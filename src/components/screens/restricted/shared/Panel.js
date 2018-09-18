import React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';


export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page {...this.props} >
        <div className="text-left">
          {this.props.children}
        </div>
      </Page>
    );
  }
}
