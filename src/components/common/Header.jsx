const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;
import axios from 'axios';

import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router"

export default function Header({ navRoutes }) {

  const [cartItem, setCartItem] = useState([]);
  const carts = useSelector(state => state.cart.carts);

  const getCartList = async () => {
    try {
      const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/cart`);
      setCartItem(res.data.data.carts);
    } catch (error) {
      console.log('error', '頁面異常請稍後再試');
    }
  };

  useEffect(() => {
    getCartList();
  }, [carts])

  return (<>
    <header>
      <div className="bg-primary-800">
        <div className="container">
          <p className="text-center text-white py-2">周年慶！滿千送百，精美小禮加碼送 ～</p>
        </div>
      </div>
      <nav className="navbar navbar-expand-md">
        <div className="container py-2">
          <Link to="/">
            <img src="https://github.com/Emilyee2001/react-week5-1/blob/main/src/assets/images/logo.png?raw=true" style={{ width: '190px' }} alt="logo" />
          </Link>
          <div className='ms-auto'>
            <Link to='/login' className='d-md-none me-3'>
              <i className="bi bi-person-gear fs-4"></i>
            </Link>
            <Link to='/cart' className='d-md-none me-3'>
              <div className="position-relative">
                <i className="bi bi-cart3 fs-5"></i>
                <span className="position-absolute top-25 start-100 translate-middle badge rounded-circle bg-dark">
                  {cartItem.reduce((total, item) => total + item.qty, 0)}
                </span>
              </div>
            </Link>
          </div>
          <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-md-5 ms-2" id="navbarNavAltMarkup">
            <ul className="navbar-nav d-flex gap-md-4">
              {navRoutes.map(page => (
                <li key={page.path} className="fs-lg fw-semibold border-md-0 border-bottom border-gray-200 py-3 py-md-2">
                  <NavLink to={page.path} className='w-100'>{page.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="ms-auto d-flex gap-4">
              <Link to='/login' className='d-none d-md-block'>
                <i className="bi bi-person-gear fs-4"></i>
              </Link>
              <Link to='/cart' className='d-none d-md-block'>
                <div className="position-relative mt-1">
                  <i className="bi bi-cart3 fs-5"></i>
                  <span className="position-absolute top-25 start-100 translate-middle badge rounded-circle bg-dark">
                    {cartItem.reduce((total, item) => total + item.qty, 0)}
                  </span>
                </div>
              </Link>
              <button className="btn btn-primary rounded-0 w-100">註冊 / 登入</button>
            </div>
          </div>
        </div>
      </nav>

    </header>

  </>)
}