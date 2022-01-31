import React from "react";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/shoppingCart", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const jsonData = await response.json();
      setCartItems(jsonData);
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  let total = 0;
  total = cartItems.reduce((t, {f_price,f_qty}) => {
    return t + parseFloat(f_price.substring(1)) * f_qty;
  },0);


  const checkout = async ()=>{
    try {
     
      
        const response = await fetch("http://localhost:5000/checkout",{
          method:"DELETE",
          headers: { token: localStorage.token },
        })
        const jsonData = await response.json();
        console.log(jsonData)
        
        window.location.reload();

      
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.map((item) => {
        return (
          <div className="container p-4 my-5 bg-secondary text-black rounded">
            <div className="container-sm  bg-light">
              <div className="row">
                <div className="col text-center h2">{item.f_name}</div>
                <div className="col text-center h2">{item.f_price}</div>
                <div className="col  text-center h2">{item.f_qty}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* bottom */}
      <div className="ms-5 ps-5 ">
        <h2>Total Price: ${total} </h2>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-endd-grid gap-2 d-md-flex justify-content-md-end me-5 pe-5">
        <button className="btn btn-primary btn-lg" type="button" onClick={checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
}
