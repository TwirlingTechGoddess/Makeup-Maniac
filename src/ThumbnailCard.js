import React from 'react';
import { Link } from 'react-router-dom';

const ThumbnailCard = ({ name, description, image_link, id, product_type }) => {

  return (
      <Link to={`${product_type}/${id}`}>
        <img src={image_link}
             alt='product thumbnail'
             className='app-img' />
      </Link>
  )
}

export default ThumbnailCard;