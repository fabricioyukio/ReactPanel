import React from 'react';
import Panel from "../shared/Panel";
import StudentNavigation from './StudentNavigation';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Activity from './pages/ActivityDetail';
// import { colors } from '@atlaskit/theme';
// import { Skeleton, presetThemes, createGlobalTheme } from '@atlaskit/navigation';
// import ClassStudents from './pages/Classes';
// import ArrowRightCircleIcon from '@atlaskit/icon/glyph/arrow-right-circle';

function mapStyles(styles) {
  return {
    transition: `all 0.2s ease`,
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  };
}


function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

const bounceTransition = {

  atEnter: {
    opacity: 0,
    scale: 1.2,
  },

  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },

  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};



export default class StudentPanel extends React.Component{
  state = {
    isCollapsed: false,
  };

  render() {
    return (
      <Panel navigation={<StudentNavigation/>} >

        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="route-wrapper">
          <Route path="/aluno/atividade/:activity_id" component={Activity} />
          <Route component={Dashboard} />
        </AnimatedSwitch>

      </Panel>
    );
  }
}
