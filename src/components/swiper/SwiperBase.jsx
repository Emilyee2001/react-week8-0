import { useRef, useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import Aos from "aos";

export default function SwiperBase({CardComponent, slidesPerView, slidesPerViewMd}) {

  const swiperRef = useRef(null);

  useEffect(() => {
    new Swiper(swiperRef.current, {
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
        }
      }
    });
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: false,
    });
  }, [])

  return (<>
    <div ref={swiperRef} className="swiper">
      <div data-aos="fade-up" className="swiper-wrapper">
        <CardComponent />
      </div>
      {/* <button className="icon-swiper-button-next btn-secondary-icon border-0 position-absolute top-50 end-0 translate-middle-y d-none d-md-block">
        <i className="bi bi-chevron-right position-absolute position-50-50"></i></button>
      <button className="icon-swiper-button-prev btn-secondary-icon border-0 position-absolute top-50 start-0 translate-middle-y d-none d-md-block">
        <i className="bi bi-chevron-left position-absolute position-50-50"></i></button> */}
    </div>
  </>)
}