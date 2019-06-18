import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import ProductCard from './ProductCard';
import Products from './Products';
import Home from './Home';
import './App.css';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      store: {},
      numCards: 10
    };
  }

  async fetchData(event) {
    event.preventDefault();
    document.querySelector('.hider').setAttribute('class', 'App-transition')
    const url = 'http://makeup-api.herokuapp.com/api/v1/products.json?';
    try {
      const response = await fetch(url)
      const data = await response.json()
      this.storeData(data).bind(this)
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

  updateState() {
    this.setState({
      isNew: true,
      numCards: 10
    })
  }

  render() {
    const types = Object.keys(this.state.store)
    const navigation = types.map((type, index) => {
      return (
        <NavLink to={"/"+type} 
                 key={index} 
                 className='nav'
                 onClick={this.updateState.bind(this)}>
          {type.toUpperCase().replace('_', ' ')}
        </NavLink>
      )
    });
    const cards = this.state.numCards
    const store = this.state.store
    const productPath = types.map((type, index) => {
      return (
        <Route exact path={'/'+type} render={() => <Products key={index} numCards={cards} products={store[type]}/>}/>
      )
    })

   if(!types.length) {
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
        </div>
      )

    } else {
        return (
          <div className="App">
            <h1>MakeUp Maniac</h1>
            <header className="App-header">
              { navigation }
            </header>
            <Switch>
              <Route exact path='/' component={Home} className='Home'/>
              {productPath}
            </Switch>
          </div>
        ) 
    }
  }
}

export default App 