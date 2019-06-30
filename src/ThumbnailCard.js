import React from 'react';
import { Link } from 'react-router-dom';

const ThumbnailCard = ({ brand, name, image, id, type }) => {

  return (
    <div className='ThumbnailCard'>
      <Link to={`${type}/${id}`}
            className='Thumbnail'>
        <h2>{name}</h2>
        <h3>by {brand}</h3>
        <img src={image}
             alt='product thumbnail'
             className='app-img' />
      </Link>
    </div>
  )
}

export default ThumbnailCard;