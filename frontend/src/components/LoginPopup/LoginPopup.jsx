import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
import { toast } from 'react-toastify';

const LoginPopup = ({setShowLogin}) => {

  const {url, setUser, setLoggedIn} = useContext(StoreContext);
  const [loginState, setLoginState] = useState("Login");

  const [data, setData] = useState({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if(loginState === "SignUp"){
      newUrl += "/user/signup";
    }else{
      newUrl += "/user/login";
    }

    const response = await axios.post(newUrl, data, {withCredentials: true});
    if(response.data.success){
      setUser({
        id: response.data.user._id,
        username: response.data.user.username,
        email: response.data.user.email,
        phoneNo: response.data.user.phoneNo,
        cartData: response.data.user.phoneNo,
      });
      setLoggedIn(true);
      setShowLogin(false);
      toast.success(response.data.message);
    }else{
      setData({
        username: "",
        email: "",
        phoneNo: "",
        password: "",
      });
      toast.error(response.data.message);
    }
  }


  return (
    <div className='login-popup'>
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{loginState}</h2>
            <i onClick={() => setShowLogin(false)} className="fa-solid fa-xmark"></i>
        </div>
        <div className="login-popup-inputs">
          {loginState==="Login"
          ? <></>
          :<input onChange={onChangeHandler} value={data.username} name="username" type="text" placeholder='Your name' required/>}
          <input onChange={onChangeHandler} value={data.email} name="email" type="email" placeholder='Your email' required/>
          {loginState==="Login"
          ? <></>
          :<input onChange={onChangeHandler} value={data.phoneNo} name="phoneNo" type="text" placeholder='Phone number' required/>}
          <input onChange={onChangeHandler} value={data.password} name="password" type="password" placeholder='Password' required/>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        <button type='submit'>{loginState ==="SignUp"? "Create Account": "Login"}</button>
        {loginState === "Login"
        ? <p>New to Paratha? <span onClick={() => setLoginState("SignUp")}>Sign up here</span></p>
        : <p>Already a user? <span onClick={() => setLoginState("Login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup
