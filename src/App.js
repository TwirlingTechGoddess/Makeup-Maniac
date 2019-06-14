import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Home from './Home';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      store: {}
    };
  }

  async fetchData(event) {
    event.preventDefault();
    console.log('firing')
    document.querySelector('.hider').setAttribute('class', 'App-transition')
    const url = 'http://makeup-api.herokuapp.com/api/v1/products.json?';
    try {
      const response = await fetch(url)
      const data = await response.json()
      this.storeData(data)
    } catch(error) {
      console.log(error.message)
    }
  }

  storeData(data) {
    const store = data.reduce((accu, cosmetic) => {
      const type = cosmetic.product_type
      if(!accu[type]){
        accu[type] = [];
      }
      accu[type].push(cosmetic)
      return accu
    }, {})
    this.setState({
      store: store
    })
    document.querySelector('.App-transition').setAttribute('hidden', true)
    document.querySelector('.Home').removeAttribute('hidden')
  }

  render() {
    const types = Object.keys(this.state.store)
    const navigation = types.map((type, index) => {
        return <NavLink to={"/"+type} key={index} className='nav'>{type.toUpperCase().replace('_', ' ')}</NavLink>
    });

    return (
      <div className="App">
        <h1>MakeUp Maniac</h1>
        <header className="App-header">
          { navigation }
        </header>
        <div className="hider">
          <h2>Enjoy the most organized and comprehensive lists of the world's premiere MakeUp brands</h2>
          <form onSubmit={this.fetchData.bind(this)}>
            <button type="submit">PRESS TO EXPLORE</button>
          </form>    
        </div>
        <Route to='/' component={Home} />
      </div>
    )
  }
}

export default App