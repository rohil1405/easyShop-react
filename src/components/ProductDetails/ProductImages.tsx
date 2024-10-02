import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ProductImagesProps {
  images: string[];
  title: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({ images, title }) => {
  return (
    <div className="product-images">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`${title} image ${index + 1}`}
              width="100%"
              height="300px"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImages;
