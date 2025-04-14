const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

import axios from 'axios';
import FullscreenLoading from '../components/FullscreenLoading';
import SwiperBase from '../components/swiper/SwiperBase';
import CardProductTemplate from '../components/swiper/CardProduct';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/slice/CartSlice';

export default function ProductDetailPage() {

  const [tempProduct, setTempProduct] = useState({});
  const [mainImage, setMainImage] = useState('');
  const [adjustQty, setAdjustQty] = useState(1);
  const [isFullscreenLoading, setIsFullscreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id: product_id } = useParams();

  const dispatch = useDispatch();

  const getProduct = async () => {
    setIsFullscreenLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/product/${product_id}`);
      setTempProduct(res.data.product);
    } catch (error) {
      handleResultMessage('error', '頁面異常請稍後再試', 'center');
    } finally {
      setIsFullscreenLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [product_id]);

  // 加入購物車
  const addCart = async (product_id, qty) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/v2/api/${apiPath}/cart`, {
        data: {
          product_id,
          qty: Number(qty),
        }
      })
      handleResultMessage('success', res.data.message, 'top-end');
      dispatch(addCartItem(res.data.data.carts));
    } catch (error) {
      handleResultMessage('error', error.response.data.message, 'center');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultMessage = (icon, message, position) => {
    Swal.fire({
      position: position,
      icon: icon,
      text: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  return (<>
    <div className='border-bottom border-gray-200'>
      <div className="container py-3">
        <div className="row">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-gray-500"><Link to="/">首頁</Link></li>
              <li className="breadcrumb-item text-gray-500"><Link to='/products'>異國香 － 香料系列</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{tempProduct.title}</li>
            </ol>
          </nav>
          <div className="col-md-7">
            <div className="row flex-md-row-reverse">
              <div className="col-md-10">
                <img className='product-card-img mb-2 mb-md-0' src={!mainImage ? tempProduct.imageUrl : mainImage} alt={tempProduct.title} />
              </div>
              <div className="col-md-2 d-flex flex-md-column gap-2 mb-4 mb-md-0">
                <a onClick={(e) => { e.preventDefault(); setMainImage(tempProduct.imageUrl) }}>
                  <img className={`product-card-img`} src={tempProduct.imageUrl} alt={tempProduct.title} />
                </a>
                {tempProduct.imagesUrl?.map(image => (
                  <a onClick={(e) => { e.preventDefault(); setMainImage(image) }}
                    key={image}>
                    <img className='product-card-img' src={image} alt={tempProduct.title} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <section className='border-bottom border-gray-200 mb-4'>
              <h2 className='text-primary mb-3'>{tempProduct.title}</h2>
              <ul className='mb-2 fs-lg list-styled px-4'>
                <li>成分：100%{tempProduct.title}</li>
                <li>類別：{tempProduct.category}</li>
                <li>有效期限：標示於包裝上</li>
              </ul>
              <p className='mb-4'>{tempProduct.description}</p>
              <div className='text-gray-500 mb-3 mb-lg-4'>
                <p>ExotiSpice 異國香堅持100%純天然、零添加，給您最安心的選擇。</p>
                <p>商品購買後建議密封冷藏保存，避免受潮變質，同時也可保色與保鮮。</p>
              </div>
            </section>
            <section className='my-4'>
              <p className='fs-lg fw-semibold mb-2'>規格</p>
              <input type="radio" className="btn-check" name="productContent" id="btnradio1" autoComplete="off" defaultChecked />
              <label className="btn btn-secondary-outlined py-2 px-4 me-2 fs-lg" htmlFor="btnradio1">{tempProduct.content}/罐</label>
              <input type="radio" className="btn-check" name="productContent" id="btnradio2" autoComplete="off" disabled />
              <label className="btn btn-secondary-outlined py-2 px-4 me-2 fs-lg fw-semibold" htmlFor="btnradio2">商用500公克/袋</label>
            </section>
            <div>
              <p className='fs-5 text-secondary fw-bold mb-4'>NT$ {tempProduct.price}</p>
              <div className="btn-group w-100 mb-4" role="group" aria-label="Basic outlined">
                <button
                  onClick={() => { setAdjustQty(adjustQty - 1) }}
                  disabled={adjustQty == 1}
                  type="button"
                  className='btn btn-outline-gray-200 text-gray-950 rounded-0'
                >-</button>
                <div
                  style={{ width: '80%' }}
                  className="btn border border-gray-200">{adjustQty}</div>
                <button
                  onClick={() => { setAdjustQty(adjustQty + 1) }}
                  disabled={adjustQty == 10}
                  type="button"
                  className='btn btn-outline-gray-200 text-gray-950 rounded-0'
                >+</button>
              </div>
              <button
                onClick={() => { addCart(tempProduct.id, adjustQty) }}
                type='button' className='btn btn-primary w-100 rounded-0 fw-semibold'
              >{isLoading ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : '加入購物車'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='border-bottom border-gray-200'>
      <div className="container py-4 py-md-5">
        <div className='mb-3 mb-md-4'>
          <h6 className='fs-md-5 mb-3'>產品介紹</h6>
          <p className='fw-bold mb-2'>產品特色</p>
          <ul className='text-gray-700 mb-3 list-styled px-4'>
            <li>低溫研磨，保留香料最原始天然的風味。</li>
            <li>ExotiSpice 異國香的產品全面選用上等原材料所製作的高品質香料。</li>
            <li>本產品經檢驗合格，無農藥殘留、無添加色素。</li>
          </ul>
          <p className='fw-bold mb-2'>瓶身設計</p>
          <ul className='text-gray-700 list-styled px-4'>
            <li>掀蓋式設計，自動回彈，單手也能輕鬆操作。</li>
            <li>瓶身流線手感一體成形，輕薄又耐用。</li>
            <li>使用完香料可清洗罐子重複填裝超環保。</li>
            <li>耐溫-20℃ ~ 150℃，冷藏保存香料更新鮮。</li>
          </ul>
        </div>
        <div className="mb-3 mb-md-4">
          <h6 className='fs-md-5 mb-3'>注意事項</h6>
          <ul className='text-gray-700 list-styled px-4'>
            <li>離島不配送。</li>
            <li>勿置陽光直射或高溫潮溼處，避免受潮變質。</li>
            <li>如未使用完畢，建議密封、冷藏或置陰涼處保存。</li>
            <li>因陽光、燈光顏色、拍攝角度，故產品略有色差，圖片僅供參考，產品以實際收到商品為主。</li>
            <li>辣度、氣味依個人口味會略顯不同，建議大量訂購前請先洽詢。</li>
          </ul>
        </div>
      </div>
    </div>
    <div className='container py-4 py-md-5'>
      <h4 className='fs-md-1 text-center mb-4 mb-md-5'>熱門排行</h4>
      <div className="row px-3">
        <SwiperBase CardComponent={CardProductTemplate} slidesPerView={5} slidesPerViewMd={3} />
      </div>
    </div>

    {isFullscreenLoading && <FullscreenLoading />}

  </>)
}