import React, { Component } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
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
      searchedProducts: [],
      typeDisplayed: 'lipstick'

    };
  }

  async fetchData(event) {
    event.preventDefault();
    document.querySelector('.hider').setAttribute('class', 'App-transition')
    document.querySelector('.intro').setAttribute('hidden', true)
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
    console.log('hit it')
    this.setState({
      isNew: true,
      numCards: 10,
      typeDisplayed: event.target.name
    })
  }

  filterProducts(string) {
    const str = string.toLowerCase()
    const results = this.state.store[this.state.typeDisplayed].reduce((accu, item, index) => {
      const newTags = item.tags.filter(word => word.toLowerCase().includes(str))
      const newColors = item.colors.filter(color => {
        if(color.colour_name){
          return color.colour_name.toLowerCase().includes(str)
        }
        return color
      })
      const nameCase = item['name'].toLowerCase().includes(str)
      const brandCase = item['brand'].toLowerCase().includes(str)
      if(newTags.length || newColors.length || nameCase || brandCase) {
        return [...accu, item] 
      }
      return accu
    }, [])
    this.setState({
      searchedProducts: results
    })
    return 
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
        <Route exact path={'/'+type} key={index} render={() => <Products numCards={cards} products={search.length>0 ? search : store[type]}/>}/>
      )
    })
    const searchPath = <Route exact path={'/search'} key='search' render={() => <Products numCards={cards} products={search.length>0 ? search : store[this.state.typeDisplayed]}/>}/>
    const itemPaths = types.map((type, index) => {
      return (
        <Route path={`/${type}/:id`} key={index} render={({ match }) => {
          const product = store[type].find(item => item.id === parseInt(match.params.id))
          if (product) {
            return <ProductCard {...product}/>
          }
        }} /> 
      )     
    })

   if(!types.length) {
      return (
        <div className="App">
          <h1><span>m</span>ake<span>u</span>p</h1> <h1 className='maniac'><span>m</span>aniac</h1>
          <header className="App-header">
            { navigation }
          </header>
          <div className="hider">
            <div className="intro">
              <h2>Enjoy the most organized and comprehensive lists of the world's premiere MakeUp brands</h2>
              <form onSubmit={this.fetchData.bind(this)}>
                <button type="submit">PRESS TO EXPLORE</button>
              </form>    
            </div>
          </div>
        </div>
      )

    } else {
        return (
          <div className="App">
          <h1><span>m</span>ake<span>u</span>p</h1> <h1 className='maniac'><span>m</span>aniac</h1>
            <header className="App-header">
              { navigation }
            </header>
            <Search filterProducts={this.filterProducts.bind(this)}
                    updateState = {this.updateState.bind(this)}/>
            <Switch>
              <Route exact path='/' render={() => 
                <Redirect to='/lipstick'/>
              }/>
              {productPaths}
            </Switch>
            {itemPaths}
          </div>
        ) 
    }
  }
}

export default App 