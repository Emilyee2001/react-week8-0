import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect } from "react";
import { Link } from "react-router";

import swiperData from "../../data/swiperData";

export default function SwiperAutoplay() {

  const { FullSwiperContent } = swiperData;
  const FullSwiperRef = useRef(null);

  useEffect(() => {
    new Swiper(FullSwiperRef.current, {
      modules: [Autoplay, Navigation],
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: ".icon-swiper-button-next",
        prevEl: ".icon-swiper-button-prev",
      }
    });
  }, [])

  return (<>
    {/* main swiper */}
    <div ref={FullSwiperRef} className="swiper">
      <div className="swiper-wrapper">
        {FullSwiperContent.map(swiper => (
          <div key={swiper.imageUrl} className="swiper-slide">
            <div className="position-relative overflow-hidden">
              <img src={swiper.imageUrl} className="object-fit-cover w-100 opacity-50 opacity-md-100 vh-70" />
              <div className="position-absolute top-50 rwd-start-md-75 rwd-start-55 translate-middle text-wrap text-break" style={{
                width: '375px'
              }}>
                <h2 className="rwd-fs-1 display-md-2 mb-3 w-60 w-md-75">{swiper.title}</h2>
                <h6 className="fs-lg fs-md-5 fw-semibold fw-md-bold text-gray-700 mb-4" style={{
                  width: '340px'
                }}>{swiper.text}</h6>
                <Link to={'/products'}><button className="btn btn-secondary-outlined px-4 py-2 mt-1">了解更多</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="icon-swiper-button-next btn-secondary-icon border-0 position-absolute top-50 end-0 translate-middle-y d-none d-md-block">
        <i className="bi bi-chevron-right position-absolute position-50-50"></i></button>
      <button className="icon-swiper-button-prev btn-secondary-icon border-0 position-absolute top-50 start-0 translate-middle-y d-none d-md-block">
        <i className="bi bi-chevron-left position-absolute position-50-50"></i></button>
    </div>
  </>)
}