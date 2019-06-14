import React, { Component } from 'react';
import { Router, NavLink } from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      love: ''
    };
  }

  componentDidMount() {
    const url = 'http://makeup-api.herokuapp.com/api/v1/products.json'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          love: data[0].name
        })
      })
      .catch(error => console.log(error.message))
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>{ this.state.love }</h1>
        </header>
      </div>
    )
  }
}

export default App