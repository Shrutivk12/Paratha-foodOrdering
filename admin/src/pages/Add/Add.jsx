import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}));
  }

  const onSubmitHandler  = async(event) => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("image", image);
      const response = await axios.post(`${url}/food/admin/add`, formData);
      if(response.data.success){
        setData({
          name: "",
          description: "",
          price: "",
        });
        setImage(false);
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    }catch(err){
      toast.error(err.response?.data?.message);
    }
  }

  return (
    <div className='add'>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image): assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => {setImage(e.target.files[0])}} type="file" name="image" id="image" hidden required />
        </div>
        <div className="add-name flex-col">
          <p>Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Enter Name' required/>
        </div>
        <div className='add-description flex-col'>
          <p>Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Enter Description' required></textarea>
        </div>
        <div className='add-price flex-col'>
          <p>Price</p>
          <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='Enter price' required/>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
      
    </div>
  )
}

export default Add
