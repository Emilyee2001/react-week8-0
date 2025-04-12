import swiperData from "../../data/swiperData";

export default function CardRecipeTemplate() {

  const { recipeContent } = swiperData;

  return (<>
    {recipeContent.map(content => (
      <div className="swiper-slide" key={content.title}>
        <div className="card border-0">
          <img src={content.image} className="card-img-top rounded-0" alt={content.title} />
          <div className="card-body">
            <div className="text-gray-700 d-flex gap-3 mb-3">
              <small><i className="bi bi-clock me-1"></i>20 分鐘</small>
              <small><i className="bi bi-heart me-1"></i>48 說讚</small>
            </div>
            <h5 className="card-title text-primary-700 mb-3">{content.title}</h5>
            <p className="card-text mb-3 text-line-clamp-3">{content.text}</p>
            <button type="button" className="btn btn-secondary-outlined py-2" style={{ width: '145px' }}>立即閱讀<i className="bi bi-chevron-right ms-2"></i></button>
          </div>
        </div>
      </div>
    ))}
  </>)
}