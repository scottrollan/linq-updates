import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import UpdateBoard from './pages/Board/UpdateBoard';
import CreateEditJobs from './pages/Jobs/CreateEditJobs';
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
      <h2>Update Pages</h2>
      <h3>on the Latino Linq Website</h3>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="UpdateServices" element={UpdateServices}></Route>
        <Route path="UpdateBoard" element={<UpdateBoard />} />
        <Route path="CreateEditJobs" element={<CreateEditJobs />} />
      </Routes>
    </div>
  );
}

export default App;
