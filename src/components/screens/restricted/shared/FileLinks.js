import React from 'react';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';

export default class FileLinks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.files.length > 0){
      return (
        <React.Fragment>
          {
            this.props.files.map(file => {

            })
          }
        </React.Fragment>
      );
    }else{
      return (
        <React.Fragment/>
      );
    }
  }
}
