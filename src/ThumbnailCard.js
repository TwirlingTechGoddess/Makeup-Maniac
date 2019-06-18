import React from 'react';
import { Link } from 'react-router-dom';

const ThumbnailCard = ({ brand, name, image_link, id, product_type }) => {

  return (
    <Link to={`${product_type}/${id}`}
          className='Thumbnail'>
      <h2>{name}</h2>
      <h3>by {brand}</h3>
      <img src={image_link}
           alt='product thumbnail'
           className='app-img' />
    </Link>
  )
}

export default ThumbnailCard;