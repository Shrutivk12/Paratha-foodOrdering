import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'

const Orders = ({url}) => {


  const [data, setData] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [outForDel, setOutForDel] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getOrders = async() => {
    try{
        const response = await axios.get(`${url}/order/admin/list`);
        if(response.data.success){
            setData(response.data.data);
        }else{
          toast.error("Error");
        }
    }catch(err) {
        toast.error(err.response?.data?.message);
    } 
  }

  const statusHandler = async(event, orderId)=>{
    try{
      const response = await axios.post(`${url}/order/admin/status`, {orderId, status: event.target.value});
      if(response.data.success){
        getOrders();
      }
    }catch(err){
      toast.error(err.response?.data?.message);
    }
  }

  const markAllOrders = async (newStatus) => {
    if(newStatus === "Out for delivery"){
      setOutForDel(true);
    }else if(newStatus === "Delivered"){
      setDelivered(true);
    }
    try {
      const res = await axios.post(`${url}/order/admin/allstatus`, { status: newStatus });
      if(res.data.success){
        toast.success(res.data.message);
        getOrders();
      }

    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setOutForDel(false);
      setDelivered(false);
    }
  };

  const handleDeleteOrders = async () => {
    setDeleting(true);
    try {
      const res = await axios.delete(`${url}/order/admin/delete`);
      if(res.data.success){
        toast.success(`Deleted ${res.data.deletedCount} orders`);
        getOrders();
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setDeleting(false);
    }
  };

  const markAsPaid = async (orderId) => {
    try {
      const res = await axios.post(`${url}/order/admin/${orderId}/paid`);
      if (res.data.success) {
        toast.success("Marked as paid");
        getOrders(); 
      }
      else{
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
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
          <button onClick={() => markAllOrders("Out for delivery")} disabled={outForDel}>{outForDel? "Loading..." : "All Out for delivery"}</button>
          <button onClick={() => markAllOrders("Delivered")} disabled={delivered}>{delivered? "Loading..." : "All Delivered"}</button>
          <button onClick={() => handleDeleteOrders()} disabled={deleting}>{deleting? "Loading..." : "Delete Old Orders"}</button>
        </div>
      </div>
      <div className='order-list'>
        {(data.length === 0) && <p style={{margin: "30px 0px"}}>No orders yet</p>}
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
            <a 
              className='check-paid' 
              href={order.paymentScreenshot} 
              style={order.paymentScreenshot ? {color: "green"}: {color: "tomato"}}>
                {order.paymentScreenshot? "View payment": "Not paid"}
            </a>
            <p 
              className='check-paid' 
              onClick={() => markAsPaid(order._id)} 
              style={{color: "green"}}>
                {order.payment? "Paid": "Mark as paid"}
            </p>
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
