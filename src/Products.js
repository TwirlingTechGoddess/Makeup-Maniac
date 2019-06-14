import React, { Component } from 'react';
import ProductCard from './ProductCard';

class Products extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const displayProducts = this.props.bye.map((product, i) => 
      <ProductCard {...product} key={product.id} className='app-img'/>
    )
    return (
      <div className='product-display'>
        {displayProducts}
      </div>
    )
  }
}

export default Products;