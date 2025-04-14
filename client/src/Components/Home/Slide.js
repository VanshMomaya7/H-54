import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from "@mui/material";
// import { products } from "./productdata";
import "./slide.css";
import { NavLink } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};



const Slide = ({ title, products }) => {
  return (
    <div className="products_section">
      <div className="products_deal">
        {/* Calling the header Props defined in Main Component to show title's dynamicallys */}
        <h3>{title}</h3>
        <button className="view_btn">View All</button>
      </div>

      <Divider />

      {/* Working Caraousel */}
      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {/* Getting data from the productsData & Loading in here using MAP method */}
        {/* By using this we can  */}

        {/* We got individual datas from API & set them here using navLinks so we can easily route through it */}
        {/* We will get different data through diferent ID */}
        {products.map((e) => {
          return (
            <NavLink to={`/getproductsone/${e.id}`}>
              <div className="products_items">
                <div className="product_img">
                  <img src={e.url} alt="productitem" />
                </div>
                <p className="products_name">{e.title.shortTitle}</p>
                <p className="products_offer">{e.discount}</p>
                <p className="products_explore">{e.tagline}</p>
              </div>
            </NavLink>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slide;
