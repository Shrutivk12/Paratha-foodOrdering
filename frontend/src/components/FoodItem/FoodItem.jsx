import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id, name, image, price, description, inStock}) => {

  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-img' src={url+"/images/"+image} alt="" />
            {!cartItems[id] ? (
              !inStock ? (
                <p className='in-stock' style={{ color: "red" }}>Out of stock</p>
              ) : (
                <div className="add" onClick={() => addToCart(id)}>
                  <i className="fa-solid fa-plus"></i>
                </div>
              )
            ) : (
              <div className="food-item-counter">
                <i className="fa-solid fa-minus" onClick={() => removeFromCart(id)}></i>
                <p>{cartItems[id]}</p>
                <i className="fa-solid fa-plus" onClick={() => addToCart(id)}></i>
              </div>
            )}
        </div>
        <div className="food-item-info">
            <p className='food-item-name'>{name}</p>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>&#8377;{price}</p>
        </div>
    </div>
  )
}

export default FoodItem
