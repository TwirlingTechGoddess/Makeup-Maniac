import React, { Component } from 'react';
import { Router, NavLink } from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      love: '',
      hate: ''
    }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>She workin</h1>
        </header>
      </div>
    )
  }
}

export default App