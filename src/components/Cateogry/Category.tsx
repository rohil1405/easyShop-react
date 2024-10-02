import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Category.scss";
import loader from '../../assets/loader.png'
import '../ProductData/loader.scss';

interface Category {
  slug: string;
  name: string;
}

const Category: React.FC = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/products/categories`);
      return response.json();
    },
  });

  if (isLoading)
    return (
      <div className="loader-container">
        <div className="loader">
          <img src={loader} alt="Loading..." />
          <span>Loading...</span>
        </div>
      </div>
    );
  if (error) return <p>Error loading categories</p>;

  return (
    <div className="container">
      <div className="category">
        <div className="category-list">
          <Swiper
            spaceBetween={10}
            slidesPerView={7}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
          >
            {categories?.map((category) => (
              <SwiperSlide key={category.slug}>
                <div className="category-item">{category.name}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Category;
