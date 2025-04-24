import { useRef, useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import Aos from "aos";
import PropTypes from "prop-types";

export default function SwiperBase({
  CardComponent,
  slidesPerView,
  slidesPerViewMd,
}) {
  const swiperRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
    }

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      // modules: [Navigation],
      loop: false,
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
      slidesPerView: 1,
      spaceBetween: 24,
      // navigation: {
      //   nextEl: ".icon-swiper-button-next",
      //   prevEl: ".icon-swiper-button-prev",
      // },
      breakpoints: {
        768: {
          slidesPerView: slidesPerViewMd,
        },
        992: {
          slidesPerView: slidesPerView,
        },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [slidesPerViewMd, slidesPerView]);

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: false,
    });
  }, []);

  return (
    <>
      <div ref={swiperRef} className="swiper">
        <div data-aos="fade-up" className="swiper-wrapper">
          <CardComponent />
        </div>
        {/* <button className="icon-swiper-button-next btn-secondary-icon border-0 position-absolute top-50 end-0 translate-middle-y d-none d-md-block">
        <i className="bi bi-chevron-right position-absolute position-50-50"></i></button>
      <button className="icon-swiper-button-prev btn-secondary-icon border-0 position-absolute top-50 start-0 translate-middle-y d-none d-md-block">
        <i className="bi bi-chevron-left position-absolute position-50-50"></i></button> */}
      </div>
    </>
  );
}

SwiperBase.propTypes = {
  CardComponent: PropTypes.elementType.isRequired, // 表示這是一個 React component
  slidesPerView: PropTypes.number.isRequired,
  slidesPerViewMd: PropTypes.number.isRequired,
};
