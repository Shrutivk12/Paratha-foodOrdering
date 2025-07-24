import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {

    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Parathas for the win!</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
            return <FoodItem key = {index} id={item._id} image = {item.image} name= {item.name} price={item.price} description = {item.description} inStock = {item.inStock}/>
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
