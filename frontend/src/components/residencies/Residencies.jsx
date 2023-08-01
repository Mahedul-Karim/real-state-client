import "./Residencies.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SliderButtons from "../../util/SliderButtons";
import PropertyCard from "../PropertyCard";
import { useProperties } from "../hooks/useProperties";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

function Residencies() {
  const { data, isLoading, isError, refetch } = useProperties();

  if (isError) {
    return toast.error(isError.message);
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "70vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const sliderSettings = {
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      750: {
        slidesPerView: 3,
      },
      1100: {
        slidesPerView: 4,
      },
    },
  };

  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data?.place?.slice(0, 8).map((d, i) => (
            <SwiperSlide key={i}>
              <PropertyCard d={d} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Residencies;
