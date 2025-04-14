import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "./banner.css";

const data = [
    // "./png01-agri.png",
    "https://i.postimg.cc/yx4hbj0x/png-Agro-01.png",
    "https://i.postimg.cc/hj7bs6zN/png-agro-02.png",
    "https://i.postimg.cc/XvPkw4Jw/png-agro-03.png",
    "https://i.postimg.cc/kGwRmRFF/png04.png"
]

const Banner = () => {
    return (
        <Carousel className='carousel'
        autoPlay={true}
        animation='slide'
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
        style:{
            backgroundColor: "#fff",
            color: "#494949",
            borderRadius:0,
            marginTop: -22,
            height:"140px",
        }
    }}
        >

          {data.map((img, i) => {
            return (
              <React.Fragment key={i}>
                <img src={img} className='banner_img' alt='' />
              </React.Fragment>
            );
          })}
        </Carousel>
      );
      
}

export default Banner;