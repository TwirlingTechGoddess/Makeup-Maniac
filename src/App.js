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

  exportStore() {
    return this.state
  }

  render() {
    const types = Object.keys(this.state.store)
    const navigation = types.map((type, index) => {
      return (
        <NavLink to={"/"+type} key={index} className='nav'>
          {type.toUpperCase().replace('_', ' ')}
        </NavLink>
      )
    });
    var counter = 0
    const productContainer = (type) => {
        if(types.length) {
          var temp = this.state.store[`${type}`]
          const displayProducts = temp.map((product, i) => {
            console.log(product)
            // <ImageCard {...product} key={product.name + i} className='app-img'/>
          })
        }
        // return (
        //   <div className='image-display'>
        //     <h1>{product_type.toUpperCase().replace('_', ' ')}!</h1>
        //     {displayProducts}
        //   </div>
        // )
    }

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
        <Route exact path='/' component={Home} />
        <Route to='/blush' component={productContainer('blush')} />
        <Route to='/bronzer' component={productContainer('bronzer')} />
        <Route to='/eyebrow' component={productContainer('eyebrow')} />
        <Route to='/eyeliner' component={productContainer('eyeliner')} />
        <Route to='/eyeshadow' component={productContainer('eyeshadow')} />
        <Route to='/foundation' component={productContainer('foundation')} />
        <Route to='/lip_liner' component={productContainer('lip_liner')} />
        <Route to='/lipstick' component={productContainer('lipstick')} />
        <Route to='/mascara' component={productContainer('mascara')} />
        <Route to='/nail_polish' component={productContainer('nail_polish')} />
      </div>
    )
  }
}

export default App