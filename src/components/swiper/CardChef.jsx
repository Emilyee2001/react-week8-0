import swiperData from "../../data/swiperData";

export default function CardChefTemplate() {

  const { chefCardContent } = swiperData;

  return (<>
    {chefCardContent.map(content => (
      <div className="swiper-slide" key={content.chefName}>
        <div className="card rounded-0 border-gray-500 h-100">
          <div className="ratio ratio-4x3"><img src={content.image} className="card-img-top p-3 object-fit-cover object-position-top" alt={content.chefName} /></div>
          <div className="card-body">
            <h5 className="text-primary-700 mb-3 text-truncate">{content.title}</h5>
            <p className="fs-sm mb-2 text-truncate">{content.subtitle}</p>
            <p className="fs-sm text-gray-800 mb-3">{content.chefName}</p>
            <p className="card-text text-line-clamp-5">{content.text}</p>
          </div>
        </div>
      </div>
    ))}
  </>)
};