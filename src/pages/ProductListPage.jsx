const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

import { Link } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FullscreenLoading from '../components/FullscreenLoading';

export default function ProductListPage() {

  const [productList, setProductList] = useState([]);
  const [isFullscreenLoading, setIsFullscreenLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const getProducts = async () => {
    setIsFullscreenLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/products/all`);
      setProductList(res.data.products);
      setCategories(['全部', ...new Set(res.data?.products.map(product => product.category))]);
    } catch (error) {
      handleResultMessage('error', '頁面異常請稍後再試', 'center');
    } finally {
      setIsFullscreenLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filterProducts = productList.filter(product => {
    if (selectedCategory === '全部') return product;
    return product.category === selectedCategory;
  });

  return (<>
    <div className="bg position-relative" style={{ backgroundImage: `url(https://github.com/Emilyee2001/react-week5-1/blob/main/src/assets/images/banner-4.png?raw=true)`, height: '30vh' }}>
      <h1 className="fs-3 fs-md-1 fs-lg-display-1 text-gray-700 position-absolute top-50 start-50 translate-middle">產品分類</h1>
    </div>
    {/* 商品列表 */}
    <div className="container py-5">
      <div className="row">
        <section className="col-lg-3 d-none d-lg-block">
          <h5 className='mb-4'>產品分類</h5>
          <div className="accordion" id="accordionProductCategory">
            <div className="accordion-item  border-bottom border-gray-200">
              <h2 className="accordion-header">
                <button className="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  異國香 － 香料系列
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                <div className="accordion-body pt-0">
                  <div className='list-group'>
                    {categories.map(category => (
                      <button
                        onClick={() => { setSelectedCategory(category) }}
                        className={`text-start border-0 bg-white py-1 fw-semibold ${selectedCategory === category && 'text-primary-700'}`} type='button' key={category}>{category}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item border-bottom border-gray-200">
              <h2 className="accordion-header">
                <button className="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  異國香 － 精選伴手禮盒系列
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body pt-0">
                  準備中
                </div>
              </div>
            </div>
            <div className="accordion-item border-bottom border-gray-200">
              <h2 className="accordion-header">
                <button className="accordion-button fw-semibold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                  限時搶購
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                <div className="accordion-body pt-0">
                  準備中
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="col-lg-9">
          <div className='border-bottom border-gray-200 mb-4'>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item text-gray-500"><Link to="/">首頁</Link></li>
                <li className="breadcrumb-item active" aria-current="page">異國香 － 香料系列</li>
              </ol>
            </nav>
            <h2 className='text-primary mb-3'>素食友善 － 健康與美味的生活夥伴</h2>
            <p className='fs-lg mb-4'>在忙碌的日常中，沒有什麼比享受健康美味的素食料理更令人放鬆愉悅了。無論是與家人一起在餐桌旁共度溫馨的用餐時光，還是為朋友準備一場豐富的素食宴會，ExotiSpice異國香的素食友善（無五辛）香料系列都為你提供多樣化的選擇，滿足你對健康與美味的所有期待。使用ExotiSpice異國香的香料，輕鬆提升每一道料理的風味，讓你享受高品質的飲食體驗，愛上每一餐！</p>
          </div>
          <div className="row d-flex flex-wrap row-gap-2">
            <p className='text-gray-700 mb-3'>共 {filterProducts.length} 項商品</p>
            {filterProducts.map(product => (
              <div key={product.id} className="column">
                <Link to={`/products/${product.id}`}
                  className="card product-card btn-gray-outlined-hover">
                  <div className='position-relative'>
                    <img src={product.imageUrl} className="card-img-top product-card-img" alt={product.title} loading="lazy" />
                    <button type="button" className='btn-gray-outlined position-absolute bottom-0 start-50 translate-middle-x mb-2'>加入購物車</button>
                  </div>
                  <div className="card-body">
                    <h6 className='mb-2 text-truncate'>{product.title}</h6>
                    <p className='mb-2'>商品內容：{product.content}</p>
                    <p className="fs-lg text-secondary-700 fw-semibold">NT$ {product.price} /罐</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>

    {isFullscreenLoading && <FullscreenLoading />}

  </>)
}