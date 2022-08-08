import React ,{useEffect, useState} from 'react'

import UserModal from '../../components/user-modal/user-modal.component'
import ProductItem from '../../components/product-item/product-item.component';
import './product-details.styles.scss'
import { useSelector } from 'react-redux';

const ProductsDetails = () => {

  const [ productsList ] = useState([
    {
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      id: 1,
    },
    {
      title: 'jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
      id: 2,
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: 'sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      id: 3,
    },
    {
      title: 'womens',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
      id: 4,
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: 'mens',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      id: 5
    }
  ]);

  const productsData = useSelector(state => state.product.productData)

  useEffect(()=>{
    console.log("product data length " + productsData.length)
  },[productsData])

  


  return (
    <div className='product-details'>
      <UserModal />
      
      
      <h1 className='title'>Products Details Page</h1>
      <div className='preview'>
        {
          productsData
          .map(({...props},index) =>(
            <ProductItem key={index} {...props} />
          ))
        }
      </div>
    </div>

  )}

export default ProductsDetails