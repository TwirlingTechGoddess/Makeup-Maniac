import React, { Component } from 'react';
import ThumbnailCard from './ThumbnailCard';

class Products extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const displayProducts = this.props.products.map((product, i) => 
      <ThumbnailCard {...product} key={product.id} className='app-img'/>
    )
    return (
      <div className='product-display'>
        {displayProducts}
      </div>
    )
  }
}

export default Products;