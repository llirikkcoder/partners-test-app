import React from 'react';
import Registration from './components/Registration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from './components/Account';
import People from './components/People/People';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Registration />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/people' element={<People />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
