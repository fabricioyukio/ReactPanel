import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
// import { Router, Route, browserHistory } from 'react-router';
import { spring, AnimatedSwitch } from 'react-router-transition';
import Alerts from '../components/Alerts';
import Login from '../components/screens/public/Login';
import Logout from '../components/screens/public/Logout';
import Oops from '../components/screens/public/Oops';
import Professor from '../components/screens/restricted/professor/ProfessorPanel';
import ProfessorStudents from '../components/screens/restricted/professor/pages/Students';
import ProfessorClasses from '../components/screens/restricted/professor/pages/Classes';
import ProfessorActivities from '../components/screens/restricted/professor/pages/Activities';
import ProfessorDashboard from '../components/screens/restricted/professor/pages/Dashboard';
import Student from '../components/screens/restricted/professor/ProfessorPanel';
import Classes from "../components/screens/restricted/professor/pages/Classes";
import Dashboard from "../components/screens/restricted/professor/pages/Dashboard";
import Activities from "../components/screens/restricted/professor/pages/Activities";
import Students from "../components/screens/restricted/professor/pages/Students";
import Restricted from "../components/screens/restricted/Restricted";

// import { Router } from 'react-router';

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

class MainRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }


  render() {

    return (
      <React.Fragment>
        <Router>
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper">
            <Route exact path="/" component={Login}/>
            <Route exact path="/logout" component={Logout}/>
            <Route path="/:profile" component={Restricted}/>
            <Route path="/" component={Oops}/>
          </AnimatedSwitch>
        </Router>
        <Alerts/>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(MainRouter);
