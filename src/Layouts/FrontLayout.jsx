import { Outlet } from "react-router"

import Header from "../components/common/Header"
import Footer from "../components/common/Footer"

export default function FrontLayout() {

  const headerRoutes = [
    {
      path: '/about',
      name: '關於我們',
    },
    {
      path: '/products',
      name: '產品分類',
    },
  ];

  const footerRoutes = [
    {
      path: '/about',
      name: '關於我們',
    },
    {
      path: '/products',
      name: '產品分類',
    },
    {
      path: '/login',
      name: '後台登入',
    }
  ];


  return (<>
    <Header navRoutes={headerRoutes} />
    <Outlet />
    <Footer navRoutes={footerRoutes} />
  </>)
}