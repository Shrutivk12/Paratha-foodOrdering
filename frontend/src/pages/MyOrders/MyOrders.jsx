import React, { useEffect, useState, useContext } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {

    const {url, loggedIn} = useContext(StoreContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const getOrders = async() => {
        try{
            const response = await axios.get(`${url}/order/allorders`, {withCredentials: true});
            if(response.data.success){
                setData(response.data.data);
            }
        }catch(err) {
            toast.error(err.response?.data?.message);
        } 
    }

    const cancelOrder = async (orderId) => {
        try {
            const res = await axios.post(`${url}/order/${orderId}/cancel`, {}, {withCredentials: true});
            if(res.data.success){
                toast.success("Order cancelled");
                getOrders(); 
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to cancel");
        }
    };

    useEffect(() =>{
        if(loggedIn){
            getOrders();
        }
        
    },[loggedIn]);
    
  return (
    <div className="my-orders">
        <h2>My Orders</h2>
    {data.length === 0 
    ? (<p>No orders found.</p>) 
    : (
        <div className="container">
        {data.map((order, index) => (
            <div key={order._id || index} className="my-orders-order">
                <h3><i className="fa-solid fa-basket-shopping"></i></h3>
                {/* <p><strong>Items:</strong></p> */}
                <p>{order.items.map((item, idx) => {
                    if(idx === order.items.length-1){
                        return item.itemId.name + " x " + item.quantity
                    }else{
                        return item.itemId.name + " x " + item.quantity + ", "
                    }
                })}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> &#8377;{order.totalAmount}</p>
                <p style={order.status == "Cancelled" ? {color: "tomato"}: {color: "green"}}><b>&#x25cf; {order.status}</b></p>
                <div className='btns'>
                    {order.status !== "Cancelled" && 
                    <button onClick={() => navigate(`/myorders/${order._id}/pay`)}>
                        Pay
                    </button>}
                    {order.status === "Preparing" && (
                    <button onClick={() => cancelOrder(order._id)}>
                        Cancel
                    </button>
                    )}
                </div>
            </div>
        ))}
        </div>
    )}
    </div>
  )
}

export default MyOrders
