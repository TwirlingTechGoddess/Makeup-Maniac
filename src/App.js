import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import ProductCard from './ProductCard';
import Products from './Products';
import { cleanData } from './helper'
import Search from './Search';
import Home from './Home';
import './App.css';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      store: {},
      numCards: 10,
    };
  }

  async fetchData(event) {
    event.preventDefault();
    document.querySelector('.hider').setAttribute('class', 'App-transition')
    const url = 'http://makeup-api.herokuapp.com/api/v1/products.json?';
    try {
      const response = await fetch(url)
      const data = await response.json()
      const cleanedData = cleanData(data)
      this.storeData(cleanedData).bind(this)
    } catch(error) {
      console.log(error.message)
    }
  }

  storeData(data) {
    this.setState({
      store: data
    })
    document.querySelector('.App-transition').setAttribute('hidden', true)
    document.querySelector('.Home').removeAttribute('hidden')
  }

  updateState(event) {
    this.setState({
      isNew: true,
      numCards: 10,
      typeDisplayed: event.target.name
    })
  }

  filterProducts(string) {
    const str = string.toLowerCase()
    const state = this.state
    const results = state.store[state.typeDisplayed].reduce((accu, item, index) => {
      const newTags = item['tag_list'].filter(word => word.toLowerCase().includes(str))
      const newColors = item['product_colors'].filter(color => color['colour_name'].toLowerCase().includes(str))
      const nameCase = item['name'].toLowerCase().includes(str)
      console.log(item['brand'], index)
      const brandCase = item['brand'].toLowerCase().includes(str)
      console.log(newTags, newColors, nameCase, brandCase, {'maxArrayLength': null})
      if(newTags.length || newColors.length || nameCase || brandCase) {
        return [...accu, item] 
      }
      return accu
    }, [])
    this.setState({searchedProducts: results})
  }

  render() {
    const types = Object.keys(this.state.store)
    const navigation = types.map((type, index) => {
      return (
        <NavLink to={"/"+type} 
                 key={index} 
                 className='nav'
                 name={type}
                 onClick={this.updateState.bind(this)}>
          {type.toUpperCase().replace('_', ' ')}
        </NavLink>
      )
    });
    const cards = this.state.numCards
    const store = this.state.store
    const search = this.state.searchedProducts
    const productPaths = types.map((type, index) => {
      return (
        <Route exact path={'/'+type} key={index} render={() => <Products numCards={cards} products={search ? search : store[type]}/>}/>
      )
    })
    const itemPaths = types.map((type, index) => {
      return (
        <Route path={`/${type}/:id`} key={index} render={({ match }) => {
          const product = store[type].find(item => item.id === parseInt(match.params.id))
          if (product) {
            return <ProductCard {...product} />
          }
        }} /> 
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
            <Search filterProducts={this.filterProducts.bind(this)}/>
            <Switch>
              <Route exact path='/' component={Home} className='Home'/>
              {productPaths}
            </Switch>
            {itemPaths}
          </div>
        ) 
    }
  }
}

export default App 