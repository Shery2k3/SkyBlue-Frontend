import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubBanner from "/Images/sub-banner.png";
import Banner1 from "/Images/banner1.png";
import Banner2 from "/Images/banner2.png"

function Banner() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    waitForAnimate: false,
  };

  return (
    <div className="banners-container">
      <div className="banner">
        <div className="slider-container">
          <Slider {...settings}>
            <div className="banner-image-container">
              <img
                className="banner-image"
                src={Banner1}
                alt="banner 1"
              />
            </div>
            <div>
              <img
                className="banner-image"
                src={Banner2}
                alt="banner 2"
              />
            </div>
          </Slider>
        </div>
      </div>
      <div className="sub-banner">
        <img src={SubBanner} alt="" />
      </div>
    </div>
  );
}

export default Banner;
