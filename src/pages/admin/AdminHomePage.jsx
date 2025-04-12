const baseUrl = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH
import axios from 'axios'

import React, { useEffect, useRef, useState } from "react";
import * as c3 from "c3";
import "c3/c3.css";
import FullscreenLoading from '../../components/FullscreenLoading'

export default function AdminHomePage() {

  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [isFullLoading, setIsFullLoading] = useState(false);
  const chartRef = useRef(null);

  const getProducts = async () => {
    try {
      const authToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)eToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      axios.defaults.headers.common['Authorization'] = authToken;
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/admin/products/all`);
      const allProducts = res.data.products;
      const items = Object.values(allProducts).map(item => item.title);
      setProductList(items);
      // 初始化 salesData，所有商品銷售數量預設為 0
      const initialSalesData = {};
      items.forEach((item) => {
        initialSalesData[item] = 0;
      });
      setSalesData(initialSalesData);
    } catch (error) {
      console.error('取得資料錯誤');
    }
  };

  const getOrderList = async () => {
    setIsFullLoading(true);
    const authToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)eToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = authToken;
    try {
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/admin/orders`)
      setOrderList(res.data.orders);
    } catch (error) {
      console.error('取得資料錯誤');
    } finally {
      setIsFullLoading(false);
    }
  };

  useEffect(() => {
    if (productList.length === 0 || orderList.length === 0) return;
    const salesSummary = {};
    productList.forEach(title => {
      salesSummary[title] = 0;
    });
    orderList.forEach(order => {
      if (!order.products) return;
      Object.values(order.products).forEach((product) => {
        const productTitle = product.product?.title; // 取得產品名稱
        const qty = product.qty || 0; // 取得數量，預設 0 避免錯誤

        if (productTitle) {
          salesSummary[productTitle] = (salesSummary[productTitle] || 0) + qty;
        }
      });
    });

    setSalesData(salesSummary);
  }, [productList, orderList]);


  useEffect(() => {
    if (Object.keys(salesData).length === 0) return;
    const columns = [
      ["銷售數量", ...Object.values(salesData)], // 銷售數量
    ];
    const categories = Object.keys(salesData);
    c3.generate({
      bindto: chartRef.current,
      data: {
        columns,
        type: "bar",
      },
      color: {
        pattern: ['#f8b6a9']
      },
      axis: {
        x: {
          type: "category",
          categories,
        },
      },
      bar: {
        width: { ratio: 0.3 },
      },
    });

  }, [salesData]);

  useEffect(() => {
    getProducts();
    getOrderList();
  }, []);

  return (<>
    <div className="container my-3">
      <h1 className='mb-5'>銷售概況</h1>
      <div ref={chartRef} />
    </div>
    {isFullLoading && <FullscreenLoading />}
  </>)
}