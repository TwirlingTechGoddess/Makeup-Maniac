import React, { Component } from 'react';
import ThumbnailCard from './ThumbnailCard';

class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      numCards: 10
    }
  }

  addCards(event) {
    event.preventDefault();
    this.setState({
      numCards: this.state.numCards + 10
    })
  }

  render() {
    
    const displayProducts = this.props.products.reduce((accu, product, i) => {
      const thumbnail = <ThumbnailCard {...product} key={product.id} className='app-img'/>
      if(i < this.state.numCards){
        return [...accu, thumbnail]
      }
      return accu
    },[])

    return (
      <div className='product-display'>
        {displayProducts}
        <form onSubmit={this.addCards.bind(this)}>
          <button>More</button>
        </form>
      </div>
    )
  }
}

export default Products;