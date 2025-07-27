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
            // console.log(response.data.data);
        }else{
          toast.error("Error");
        }
    }catch(err) {
        console.log("Failed" + err);  
    } 
  }

  const [orderStats, setOrderStats] = useState([]);
  

  const statusHandler = async(event, orderId)=>{
    const response = await axios.post(`${url}/order/status`, {orderId, status: event.target.value});
    if(response.data.success){
      getOrders();
    }
  }

  const markAllOrders = async (newStatus) => {
    try {
      const res = await axios.post(`${url}/order/admin/allstatus`, { status: newStatus });
      if(res.data.success){
        toast.success(res.data.message);
        getOrders();
      }

      // Optionally refresh orders list
    } catch (err) {
      alert("Failed to update orders");
    }
  };

  const handleDeleteOrders = async () => {
    try {
      const res = await axios.delete(`${url}/order/admin/delete`);
      if(res.data.success){
        toast.success(`Deleted ${res.data.deletedCount} orders`);
        getOrders();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete orders");
    }
  };

  useEffect(()=>{
    getOrders();
    const getOrdersStats = async () => {
      try {
        const res = await axios.get(`${url}/order/admin/parathastats`);
        setOrderStats(res.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    getOrdersStats();
  },[])

  return (
    <div className='order add'>
      <h3>All Orders</h3>
      <div className='admin-ops'>
        <div className='admin-stats'>
        {orderStats.map((item,index) => (
          <p key={index}><b>{item.foodName}: </b> {item.totalOrdered}</p>
        ))}
        </div>
        <div className='btns'>
          <button onClick={() => markAllOrders("Out for delivery")}>All Out for delivery</button>
          <button onClick={() => markAllOrders("Delivered")}>All Delivered</button>
          <button onClick={() => handleDeleteOrders()}>Delete Old Orders</button>
        </div>
      </div>
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
              <option value="Preparing">Preparing</option>
              <option value="Cancelled" style={{color:"red"}}>Cancelled</option>
              <option value="Out for delivery" >Out for delivery</option>
              <option value="Delivered" >Delivered</option>
            </select>

            
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Orders
