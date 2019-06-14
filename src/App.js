import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import ThumbnailCard from './ThumbnailCard';
import ProductCard from './ProductCard';
import Products from './Products';
import Home from './Home';
import './App.css';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      store: {},
      test:[]
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

  exportStore() {
    return this.state
  }

  render() {
    var types = Object.keys(this.state.store)
    const navigation = types.map((type, index) => {
      return (
        <NavLink to={"/"+type} key={index} className='nav'>
          {type.toUpperCase().replace('_', ' ')}
        </NavLink>
      )
    });
    const productContainer = (type) => {
      if(types.length) {
        const temp = this.state.store[`${type}`]
        const displayProducts = temp.map((product, i) => 
          console.log(product)
          // <ThumbnailCard {...product} key={product.name + i} className='app-img'/>
        )
        return (
          <div className='image-display'>
            <h1>{type.toUpperCase().replace('_', ' ')}!</h1>
            {displayProducts}
          </div>
        )
      }
    }
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
              <Route exact path='/blush' render={() => <Products bye={this.state.store.blush}/>}/>
            </Switch>
          </div>
        ) 
    }
  }
}

export default  App 