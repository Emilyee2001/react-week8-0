const baseUrl = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH
import axios from 'axios'

import FullscreenLoading from '../../components/FullscreenLoading'
import Toast from '../../components/admin/toast'
import Pagination from '../../components/admin/Pagination'
import { showToast } from '../../redux/slice/toastSlice'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function AdminOrdersPage() {

  const dispatch = useDispatch();
  const [isFullLoading, setIsFullLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  const getOrderList = async (page = 1) => {
    const authToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)eToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = authToken;
    setIsFullLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/admin/orders?page=${page}`)
      setOrderList(res.data.orders);
      setPageInfo(res.data.pagination);
    } catch {
      console.error('取得資料錯誤')
    } finally {
      setIsFullLoading(false);
    }
  };

  const delOrder = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/v2/api/${apiPath}/admin/order/${id}`);
      dispatch(showToast({
        text: res.data.message,
        status: 'success'
      }))
      getOrderList();
    } catch (error) {
      dispatch(showToast({
        text: error.response.data.message,
        status: 'error'
      }))
    }
  };

  useEffect(() => {
    getOrderList();
  }, [])

  return (<>
    <div className="container my-3">
      <div className="d-flex mb-3">
        <h1>訂單管理</h1>
      </div>
      <table className="table">
        <thead className='table-primary'>
          <tr>
            <th scope="col">訂單時間</th>
            <th scope="col">訂購人</th>
            <th scope="col">付款狀態</th>
            <th scope="col">商品明細</th>
            <th scope="col">金額總計</th>
            <th scope="col">編輯管理</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map(order => (
            <tr key={order.id}>
              <th scope="row">{new Date(order.create_at * 1000).toLocaleDateString("zh-TW")}</th>
              <td>{order.user?.name}</td>
              <td>{order.is_paid ? (<p className='text-success'>已付</p>) : (<p className='text-danger'>未付</p>)}</td>
              <td><ul className='list-styled'>
                {Object.values(order.products || {}).map((item, index) => (
                  <li key={index}>
                    {`${item.product?.title} x ${item.qty}`}
                  </li>
                ))}
              </ul></td>
              <td>{order.total}</td>
              <td>
                <button onClick={() => { delOrder(order.id) }} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <Pagination pageInfo={pageInfo} getData={getOrderList} />
    </div>
    <Toast />
    {isFullLoading && <FullscreenLoading />}
  </>)
}