import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import UpdateBoard from './pages/Board/UpdateBoard';
import UpdateEvents from './pages/Events/UpdateEvents';
import UpdateServices from './pages/Services/UpdateServices';
import logo from './assets/LogoShape.png';
import text from './assets/Latino LinQ Logo Text.png';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.logoHolder}>
        <img src={logo} className={styles.logo} alt="logo" />
        <img src={text} className={styles.logoText} alt="Latino Linq" />
      </div>
      <h2>Update Board Members, Direct Services or Calendar Events</h2>
      <h3>for the Latino Linq Website</h3>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route
            path="/UpdateServices"
            exact
            component={UpdateServices}
          ></Route>
          <Route path="/UpdateBoard" exact component={UpdateBoard}></Route>
          <Route path="/UpdateEvents" exact component={UpdateEvents}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
