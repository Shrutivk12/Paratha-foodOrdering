import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState({});
    const url = "https://name-server.onrender.com";
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const [food_list, setFoodList] = useState([]);
    const getFoodList = async() =>{
        const response = await axios.get(url+"/food/admin/list");
        setFoodList(response.data.data);
    }

    useEffect(() => {
        // console.log("Checking auth...");
        const checkAuth = async () => {
            try {
                await getFoodList();
                const res = await axios.get(`${url}/user/isauth`, {withCredentials: true});
                if (res.data.success) {
                    setLoggedIn(true);
                    setUser(res.data.user);
                    await loadCartData(loggedIn);
                } else {
                    setLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                setLoggedIn(false);
                setUser(null);
            }
        };
        checkAuth();
        const interval = setInterval(getFoodList, 5000); // every 5 seconds

        return () => clearInterval(interval);
    }, []);


    

    const addToCart = async(itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId] : 1}));
        }else{
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] +1}));
        }
        if(loggedIn){
            await axios.post(url + "/cart/add", {itemId}, {withCredentials: true});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] -1}));
        if(loggedIn){
            await axios.post(url + "/cart/remove", {itemId}, {withCredentials: true});
        }
    }

    const loadCartData = async (loggedIn) => {
        const response = await axios.get(url+"/cart/list", {withCredentials: true});
        setCartItems(response.data.cartData);
    }

    const getTotalAmount = () =>{
        let amt = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product) => product._id === item);
                amt += itemInfo.price* cartItems[item];
            }
        }
        return amt;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,
        user,
        setUser,
        loggedIn,
        setLoggedIn,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;