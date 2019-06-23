import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, brand, image, description, product, colors }) => {

    const colorChart = colors.map((color, index) => {
      return(
        <h2 key={index} style={{color: color.hex_value}}>{color.colour_name}</h2>
      )
    })

    return (
      <div>
        <Link to={`/${product}`} className='back-btn'>◀ back</Link>
        <h1>{name}</h1>
        <h2>{brand}</h2>
        <img src={image} 
             className='app-img-no-hover'
             alt='full size product view'/>
        <p className='product-description'>{description}</p>
        <div>
          <h3>Available in:</h3>
          {colorChart}
        </div>
      </div>
    )
}

export default ProductCard;