import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Departments.scss";
import { ProductData } from "../ProductData/ProductData";
import loader from "../../assets/loader.png";
import "../ProductData/loader.scss";

interface ProductsShow {
  products: ProductData[];
}

const Departments = () => {
  const {
    data: productsResponse,
    isLoading,
    error,
  } = useQuery<ProductsShow>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=100`);
      if (!response.ok) {
        throw new Error("Network");
      }
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
  if (error) return <p>Error</p>;

  return (
    <>
      <div className="section-wrap">
        <div className="container">
          <div className="section-title">
            <h2 className="h2">Departments</h2>
          </div>
        </div>
      </div>
      <div className="images">
        <div className="image-list">
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {productsResponse?.products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="image-item">
                  <img src={product.thumbnail} alt={product.title} />
                  <div className="details">
                    <header>
                      <h2>{product.title}</h2>
                      <p>${product.price}</p>
                      <img src={product.meta.qrCode} alt={product.title} />
                    </header>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Departments;
