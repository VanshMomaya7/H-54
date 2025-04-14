import { Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./cart.css";
import {Logincontext} from "../Context/Contextprovider";
import { ToastContainer, toast } from "react-toastify";


const Cart = () => {
  const { id } = useParams("");
  // console.log(id);

  const history = useNavigate("");


  const {account, setAccount} = useContext(Logincontext);

  // Getting Individual data
  const [indData, setIndData] = useState([]);
  console.log(indData);

  const getIndData = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log("no data Available");
    } else {
      console.log("get Data");
      setIndData(data);
    }
  };

  useEffect(() => {
    getIndData();
  }, [id]);

  // Add to cart
  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/${id}`,{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify({indData}),
      credentials: "include"
    });

    const data1 = await checkres.json();
    console.log(data1);

    if(checkres.status === 401 || !data1){
      console.log("Invalid Data");
      // alert("User Invalid");
      toast.warning("User Invalid ", {
        position: "top-center",
      });
      
    }
    else{
      alert("Data Added");
      history("/buynow")
      setAccount(data1);
    }


  };

  return (
    <div className="cart-section">
      {indData && Object.keys(indData).length && (
        <div className="cart-container">
          <div className="left-cart">
            <img
              className="cart-img"
              src={indData.detailUrl}
              alt="Product-Img"
            />
            <div className="cart-btn">
              <button
                className="cart-btn-1"
                onClick={() => addtocart(indData.data1)}
              >
                Add to Cart
              </button>
              <button className="cart-btn-2">Buy Now</button>
            </div>
          </div>
          <div className="right-cart">
            <h3>{indData.title.shortTitle}</h3>
            <h4>{indData.title.longTitle}</h4>
            <Divider />
            <p className="MRP">M.R.P. : {indData.price.mrp}</p>
            <p className="">
              Deal of the Day :{" "}
              <span style={{ color: "#b12704" }}>₹{indData.price.cost}</span>
            </p>
            <p className="">
              You Save :{" "}
              <span style={{ color: "#b12704" }}>
                {indData.price.mrp - indData.price.cost} (
                {indData.price.discount})
              </span>
            </p>

            <div className="discount-box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{indData.discount}</span>
              </h5>
              <h4>
                Free Delivery{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Oct 8 - 21{" "}
                </span>
                Details
              </h4>
              <p>
                Fastest Delivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tommorow 11AM
                </span>
              </p>
            </div>
            <p className="description">
              About the Item:{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.4px",
                }}
              >
                {indData.description}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
