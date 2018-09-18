import React from 'react';
import PropTypes from 'prop-types';
import FyLink from './FyLink';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';
import ImageIcon from '@atlaskit/icon/glyph/image';
import * as CONFIG from '../../../../constants/config';
import Button from '@atlaskit/button';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  static propTypes = {
    files: PropTypes.array,
    icon: PropTypes.element,
    title: PropTypes.string,
    href: PropTypes.string,
    width: PropTypes.string,
    linkComponent: PropTypes.element,
    actions : PropTypes.arrayOf(PropTypes.node)
  }

  static defaultProps = {
    files: [],
    size: 'medium',
    linkComponent: FyLink,
    title: '',
    href:'',
    width:'auto',
    actions: []
  }

  render() {
    const Linker = (!!this.props.linkComponent) ? this.props.linkComponent : <div />;

    if(this.props.href !== ''){
      return (
        <React.Fragment>
          <div className="fy-card" style={{width:this.props.width}}>
            <Linker className="linker" href={this.props.href}>
              {((!!this.props.icon) || (this.props.title !== '')) &&
              <header className="grid-x">
                {(!!this.props.icon) && <div className="cell shrink">{this.props.icon}</div>}
                {(this.props.title !== '') && <div className="cell auto">{this.props.title}</div>}
              </header>
              }
              <section className='body'>
                {this.props.children}
              </section>

              { (this.props.files.length > 0) &&
              this.props.files.map((file, index)=>{
                <Button key={index} href={ CONFIG.MEDIA_URL + file.filename }
                        iconBefore={ (file.type.startsWith('image'))? <ImageIcon/> : <AttachmentIcon/> }>
                  Arquivo {(index+1)}
                </Button>
              })
              }
              { (this.props.actions.length > 0) &&
              <div className="actions">
                { this.props.actions.map((action, index)=>{
                  <div className="action" key={index}>{action}</div>
                })}
              </div>
              }

            </Linker>

          </div>
        </React.Fragment>
      );
    }else{
      return (
        <React.Fragment>
          <div className="fy-card" style={this.props.style}>
            <div className="linker">
              {((!!this.props.icon) || (this.props.title !== '')) &&
              <header className="grid-x">
                {(!!this.props.icon) && <div className="cell shrink">{this.props.icon}</div>}
                {(this.props.title !== '') && <div className="cell auto">{this.props.title}</div>}
              </header>
              }
              <section className='body'>
                {this.props.children}
              </section>
              { (this.props.files.length > 0) &&
              this.props.files.map((file, index)=>{
                <Button key={index} href={ CONFIG.MEDIA_URL + file.filename }
                        iconBefore={ (file.type.startsWith('image'))? <ImageIcon/> : <AttachmentIcon/> }>
                  Arquivo {(index+1)}
                </Button>
              })
              }
              { (this.props.actions.length > 0) &&
              <div className="actions">
                { this.props.actions.map((action, index)=>{
                  <div className="action" key={index}>{action}</div>
                })}
              </div>
              }
            </div>

          </div>
        </React.Fragment>
      );
    }


  }
}
