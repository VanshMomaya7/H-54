import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./buyNow.css";
import Option from "./Option";
import Right from "./Right";
import Subtotal from "./Subtotal";
const BuyNow = () => {
  const [carddata, setCarddata] = useState("");
  // console.log(carddata.carts);

  const getdatabuy = async () => {
    const res = await fetch("./carddetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status != 201) {
      console.log("error");
    } else {
      setCarddata(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  });

  return (
    <>
    {
      carddata.length ? <div className="buynow-section">
      <div className="buynow-container">
        <div className="left-buy">
          <h1>Shopping Cart</h1>
          <p>Select all Item</p>
          <span className="left-buy-price">Price</span>
          <Divider />
          {
            carddata.map((e,k)=>{
              return ( 
                <div className="item-container">
                <img
                  src={e.url}
                  alt="product-img"
                />
                <div className="item-details">
                  <h3>Molife sense 500 Smartwatch (Black Strap, FreeSize)</h3>
                  <h3>Smart Watches</h3>
                  <h3 className="differentprice">₹4049.00</h3>
                  <p className="unusuall">Usually dispatched in 8 days.</p>
                  <p>Eligible For FREE shipping</p>
                  <Option />
                </div>
                <h3 className="item-price">₹4049.00</h3>
              </div>
              )
            })
          }

         
          <Divider />
          <Subtotal />
        </div>
        <Right />
      </div>
    </div> : ""
    }
    </>
  );
};

export default BuyNow;
