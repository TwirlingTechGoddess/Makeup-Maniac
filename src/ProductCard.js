import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, brand, image, description, type, colors,tags }) => {

    const colorChart = colors.map((color, index) => {
      return(
        <h2 className='colorChart' key={index} style={{color: color.hex_value}}>{color.colour_name}</h2>
      )
    })
    const tagsChart = tags.map((word, index) => {
      if(index === 0) {
        return ' ' + word
      } else {
        return ', ' + word
      }
    })

    return (
      <div className='ProductCard'>
        <Link to={`/${type}`} 
              className='back-btn'>◀ back</Link>
        <h2>{name}</h2>
        <h3>by {brand}</h3>
        <img src={image} 
             className='app-img-no-hover'
             alt='full size product view'/>
        <h2 className='product-description'>{description}</h2>
        <div>
          <p>TAGS: <em>{tagsChart.length ? tagsChart : 'no tag words'}</em></p>
          <h3>Available in:</h3>
          <p>{colorChart}</p>
        </div>
      </div>
    )
}

export default ProductCard;