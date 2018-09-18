import React from 'react';
// import { colors } from '@atlaskit/theme';
// import { Skeleton, presetThemes, createGlobalTheme } from '@atlaskit/navigation';
import Panel from "../shared/Panel";
import ProfessorNavigation from './ProfessorNavigation';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Activity from './pages/ActivityDetail';
import Students from './pages/Students';
import Student from './pages/Students';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail';
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



export default class ProfessorPanel extends React.Component{
  state = {
    isCollapsed: false,
  };

  render() {
    return (
      <Panel navigation={<ProfessorNavigation/>} >

        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="route-wrapper">
          {/*<Route path="/professor/aluno/:student_id" component={Student} />*/}
          {/*<Route path="/professor/alunos" component={Students} />*/}
          <Route path="/professor/atividade/:activity_id" component={Activity} />
          <Route path="/professor/atividades" component={Activities} />
          <Route path="/professor/turma/:class_id" component={ClassDetail} />
          <Route path="/professor/turmas" component={Classes} />
          <Route component={Dashboard} />
        </AnimatedSwitch>

      </Panel>
    );
  }
}
