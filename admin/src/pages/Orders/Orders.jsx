import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'

const Orders = ({url}) => {


  const [data, setData] = useState([]);
  const getOrders = async() => {
    try{
        const response = await axios.get(`${url}/order/list`);
        if(response.data.success){
            setData(response.data.data)
            console.log(response.data.data);
        }else{
          toast.error("Error");
        }
    }catch(err) {
        console.log("Failed" + err);  
    } 
  }

  const statusHandler = async(event, orderId)=>{
    const response = await axios.post(`${url}/order/status`, {orderId, status: event.target.value});
    if(response.data.success){
      getOrders();
    }
  }

  useEffect(()=>{
    getOrders();
  },[])

  return (
    <div className='order add'>
      <h3>All Orders</h3>
      <div className='order-list'>
        {data.map((order, index)=>(
          <div key={index} className='order-item'>
            <i className="fa-solid fa-basket-shopping"></i>
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) =>{
                  if(idx === order.items.length-1){
                        return item.itemId.name + " x " + item.quantity
                    }else{
                        return item.itemId.name + " x " + item.quantity + ", "
                    }
                })}
              </p>
            
            <p className='order-item-name'>{order.user.username}</p>
            <p className='order-item-phone'>{order.user.phoneNo}</p>
            </div>
            <p>&#8377; {order.totalAmount}</p>
            <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Paid">Paid</option>
            </select>

            
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Orders
