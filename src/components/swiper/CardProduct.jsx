const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function CardProductTemplate() {

  const [productRender, setProductRender] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/products/all`);
      const productsList = res.data.products;
      setProductRender([...productsList.slice(0, 5)]);
    } catch (error) {
      console.error(error, '取得資料失敗');
    }
  };

  useEffect(() => {
    getProducts();
  }, [])

  return (<>
    {productRender.map(product => (
      <div className="swiper-slide" key={product.id}>
        <div>
          <Link to={`/products/${product.id}`}
            className="card product-card btn-gray-outlined-hover">
            <div className='position-relative'>
              <img src={product.imageUrl} className="card-img-top product-card-img" alt={product.title} />
              <button type="button" className='btn-gray-outlined position-absolute bottom-0 start-50 translate-middle-x mb-2'>商品細節</button>
            </div>
            <div className="card-body">
              <h6 className='mb-2 text-truncate'>{product.title}</h6>
              <p className='mb-2 text-line-clamp-3'>{product.description}</p>
              <p className="fs-lg text-secondary-700 fw-semibold">NT$ {product.price} /罐</p>
            </div>
          </Link>
        </div>
      </div>
    ))}
  </>)
};