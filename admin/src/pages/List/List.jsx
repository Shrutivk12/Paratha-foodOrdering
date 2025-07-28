import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify'

const List = ({url}) => {

  const [list, setList] = useState([]); 

  const fetchList = async() =>{
    const response = await axios.get(`${url}/food/admin/list`);
    if(response.data.success){
      setList(response.data.data);
    }else{
      toast.error("Error");
    }
  }

  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/food/admin/remove`, {id:foodId});
    try{
      await fetchList();
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    }catch(err){
      toast.error(err.response?.data?.message);
    }
  }

  const toggleStock = async (id, newStatus) => {
    try {
      const response = await axios.post(`${url}/food/admin/${id}/instock`, { inStock: newStatus });
      if(response.data.success){
        fetchList();
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>Food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>inStock</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>&#8377;{item.price}</p>
              <p className='cursor' onClick={() => toggleStock(item._id, !item.inStock)}>
                {item.inStock ? 'In stock' : 'Out of stock'}
              </p>
              <p onClick={() => removeFood(item._id)} className='cursor'><i className="fa-solid fa-xmark"></i></p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
