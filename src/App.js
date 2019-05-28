import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <h2>Hi there</h2>
        <a href="/auth/google">Sign in with google</a>
      </p>
    </div>
  );
}

export default App;
