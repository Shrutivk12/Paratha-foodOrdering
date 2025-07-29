import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {food_list, cartItems, setCartItems, removeFromCart, getTotalAmount, url} = useContext(StoreContext);
  const navigate = useNavigate();

  const placeOrder = async() => {
    const items = Object.keys(cartItems).map((id) => ({
      itemId: id,
      quantity: cartItems[id],
    }));
    const totalAmount = getTotalAmount();
    
    if(items.length == 0){
      return toast.error("Cart is Empty");
    }

    try{
      const res = await axios.post(`${url}/order/place`, { items, totalAmount }, { withCredentials: true });
      if (res.data.success) {
        setCartItems({});
        toast.success("Order placed");
        navigate("/myorders");
      } else {
        toast.error(res.data.message || "Failed to place order");
      }
    }catch(err){
      toast.error(err.response?.data?.message);
    }
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index) =>{
          if(cartItems[item._id] >0){
            return(
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>&#8377;{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>&#8377;{item.price* cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'><i className="fa-solid fa-xmark"></i></p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-total">
        <h2>Cart Total</h2>
        <hr />
        <div className='cart-total-details'>
          <p><b>Total</b></p>
          <p className='amt'><b>&#8377;{getTotalAmount()}</b></p>
        </div>
        <hr />
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  )
}

export default Cart
