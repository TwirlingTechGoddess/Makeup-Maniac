import React, { Component } from 'react';
import ThumbnailCard from './ThumbnailCard';

class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      numCards: this.props.numCards
    }
  }

  editNumCards(event) {
    event.preventDefault();
    let name = event.target.name
    let cards = this.state.numCards
    if(name === 'less' && cards > 10) {
      this.setState({
        numCards: cards - 10
      })    
    } 
    if(name ==='more' && cards < this.props.products.length) {
      this.setState({
        numCards: cards + 10
      })
    }
  }

  render() {

    const displayProducts = this.props.products.reduce((accu, product, i) => {
      const cards = this.state.numCards
      const thumbnail = <ThumbnailCard {...product} 
                                       key={product.id} 
                                       className='app-img'/>
      if(i < cards){
        return [...accu, thumbnail]
      }
      return accu
    },[])

    return (
      <div className='product-display'>
        <form onSubmit={this.editNumCards.bind(this)}
              name='less'>
          <button>Less</button>
        </form>
        <form onSubmit={this.editNumCards.bind(this)}
              name='more'>
          <button>More</button>
        </form>
        {displayProducts}
      </div>
    )
  }
}

export default Products;