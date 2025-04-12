import { Link } from "react-router";
import { useEffect } from "react";
import Aos from "aos";

import Slideshow from "../components/Slideshow";
import slideshowData from "../data/slideshowData";
import SwiperAutoplay from "../components/swiper/SwiperAutoplay"
import SwiperBase from "../components/swiper/SwiperBase";
import CardChefTemplate from "../components/swiper/CardChef";
import CardRecipeTemplate from "../components/swiper/CardRecipe";
import CardProductTemplate from "../components/swiper/CardProduct";

export default function HomePage() {

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: false,
    });
  }, [])

  return (<>
    <SwiperAutoplay />
    {/* Swiper */}
    <div className="container py-4 py-md-5">
      <div className="row px-4">
        <div className="d-flex justify-content-center">
          <h4 className="fs-md-1 mb-4 mb-md-5 line-deco">冬季購物節</h4>
        </div>
        <SwiperBase CardComponent={CardProductTemplate} slidesPerView={5} slidesPerViewMd={3} />
        <Link to={'/products'} className="d-flex"><button type="button" className="btn btn-secondary-outlined m-md-auto py-2 mt-4 mt-md-5" style={{ width: '145px' }}>立即選購<i className="bi bi-chevron-right ms-2"></i></button></Link>
      </div>
    </div>
    {/* slideshow */}
    {slideshowData.map((banner, index) => (
      <div key={index} className="container py-4 py-md-5">
        <div className="d-flex justify-content-center">
          <h4 className="fs-md-1 mb-4 mb-md-5 line-deco">{banner.title}</h4>
        </div>
        <div className={`row ${index % 2 == 1 && 'flex-md-row-reverse'}`}>
          <div className="col-md-6">
            <Slideshow images={banner.images} />
          </div>
          <div  data-aos="fade-up" className="col-md-6">
            <div className="d-flex flex-column justify-content-center h-100">
              <h4 className="text-primary-700 fs-md-2 mb-3">{banner.subtitle}</h4>
              <p className="fs-lg">{banner.text}</p>
              <Link to={'/products'}><button type="button" className="btn btn-secondary-outlined py-2 mt-4 mt-md-5" style={{ width: '145px' }}>立即選購<i className="bi bi-chevron-right ms-2"></i></button></Link>
            </div>
          </div>
        </div>
      </div>
    ))}
    {/* Swiper */}
    <div className="bg-gray-50">
      <div className="container py-4 py-md-5">
        <div className="d-flex justify-content-center">
          <h4 className="fs-md-1 mb-4 mb-md-5 line-deco">名廚推薦，翻轉餐桌新革命</h4>
        </div>
        <div className="row px-4">
          {/* <View4Swiper /> */}
          <SwiperBase CardComponent={CardChefTemplate} slidesPerView={4} slidesPerViewMd={2} />
        </div>
      </div>
    </div>
    {/* Swiper */}
    <div className="container py-4 py-md-5">
      <div className="d-flex justify-content-center">
        <h4 className="fs-md-1 mb-4 mb-md-5 line-deco">愛上料理，掌握美味關鍵</h4>
      </div>
      <div className="row px-4">
        <SwiperBase CardComponent={CardRecipeTemplate} slidesPerView={3} slidesPerViewMd={2} />
      </div>
    </div>
  </>)
}