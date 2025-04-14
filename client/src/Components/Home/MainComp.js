import React, { useEffect } from "react";
import Banner from "./Banner";
import "./home.css";
import Slide from "./Slide";
import { getproducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

const MainComp = () => {

  const {products} = useSelector(state => state.getproductsdata);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getproducts());
  },[dispatch]);

  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>

      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal of the Day" products={products} />
        </div>
        
      </div>

      {/* Giving Props Title this will be called in Slide.js so the names will be shown dynamically */}
      <Slide title="Today's Deal" products={products} />
      <div className="center_img">
        <img
          src="https://i.postimg.cc/zBvtnqL7/flat-agriculture-company-sale-banner-template-23-2149720636.png"
          alt=""
        />
      </div>
      <Slide title="Best Seller" products={products} />
      <Slide title="Upto 80% off" products={products} />
    </div>
  );
};

export default MainComp;
