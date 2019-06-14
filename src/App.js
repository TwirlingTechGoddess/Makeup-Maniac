import React, { Component } from 'react';
import { Router, NavLink } from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      store: {}
    };
  }

  async componentDidMount() {
    const url = 'http://makeup-api.herokuapp.com/api/v1/products.json?'
    try {
      const response = await fetch(url)
      const data = await response.json()
      await this.storeData(data)
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
  }

  render() {
    const types = Object.keys(this.state.store)
    const navigation = types.map(type => {
        return <NavLink to={"/"+type} className='nav'>{type.toUpperCase().replace('_', ' ')}</NavLink>
    });

    return (
      <div className="App">
        <header className="App-header">
          { navigation }
        </header>
      </div>
    )
  }
}

export default App