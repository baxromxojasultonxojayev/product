import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MenuList from "src/components/Navbar";
import { EffectCards, Autoplay } from "swiper/modules";

import "./style.scss";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "src/components/ProductCard";

// Install Swiper modules

interface Product {
  id: number;
  title: string;
  price: number;
}

const HomePage: React.FC = () => {
  const [newData, setNewData] = useState<Product[]>([]);
  const sectionSlider = [
    {
      backgroundColor: "rgb(206, 17, 17)",
      title: "Welcome to our project",
    },
    {
      backgroundColor: "rgb(0, 140, 255)",
      title: "You can find everything from here",
    },
    {
      backgroundColor: "rgb(10, 184, 111)",
      title: "We can find for you ",
    },
    {
      backgroundColor: "rgb(211, 122, 7)",
      title: "Enjoy of your survey",
    },
    {
      backgroundColor: "rgb(118, 163, 12)",
      title: "We are glad to stay with us",
    },
  ];

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setNewData(data.products.slice(0, 10)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="home-page">
      <MenuList />
      <div className="container">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[EffectCards, Autoplay]}
          className="mySwiper"
        >
          {sectionSlider.map((item) => (
            <SwiperSlide style={{ backgroundColor: item.backgroundColor }}>
              <h1>{item.title}</h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="products">
        <h1 className="product-tile">Our products</h1>
        <div className="products-list">
          {newData &&
            newData.map((product: any) => (
              <ProductCard productData={product} />
            ))}
        </div>
        <p className="link">
          <a href="/products">Show more</a>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
