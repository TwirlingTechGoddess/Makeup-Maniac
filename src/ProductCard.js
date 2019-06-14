import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, brand, image_link, description, product_type, product_colors }) => {
  return (
    <div>
      <Link to={`/${product_type}`} className='back-btn'>◀ back</Link>
      <h1>{name}</h1>
      <h2>{brand}</h2>
      <img src={image_link} className='app-img-no-hover'/>
      <p className='product-description'>{description}</p>
      <aside>{product_colors}</aside>
    </div>
  )
}

export default ProductCard;