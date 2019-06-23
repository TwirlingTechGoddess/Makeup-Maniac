import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, brand, image, description, product, colors }) => {

  return (
    <div>
      <Link to={`/${product}`} className='back-btn'>◀ back</Link>
      <h1>{name}</h1>
      <h2>{brand}</h2>
      <img src={image} 
           className='app-img-no-hover'
           alt='full size product view'/>
      <p className='product-description'>{description}</p>
    </div>
  )
}

export default ProductCard;