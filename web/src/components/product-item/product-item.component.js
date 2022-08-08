import React from 'react';

import './product-item.styles.scss';


const ProductItem = ( { id, title, description, imageUrl} ) => {
    return(
        <div className='product-item'>
            <span className='title'>{title}</span>
            <div
            className='image'
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
            >
            </div>
            <div className='product-footer'>
                <span className='description'>{description}</span>
            </div>
        </div>
    )
}


export default ProductItem;