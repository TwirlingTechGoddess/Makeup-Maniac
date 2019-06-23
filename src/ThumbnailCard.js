import React from 'react';
import { Link } from 'react-router-dom';

const ThumbnailCard = ({ brand, name, image, id, type }) => {

  return (
    <Link to={`${type}/${id}`}
          className='Thumbnail'>
      <h2>{name}</h2>
      <h3>by {brand}</h3>
      <img src={image}
           alt='product thumbnail'
           className='app-img' />
    </Link>
  )
}

export default ThumbnailCard;