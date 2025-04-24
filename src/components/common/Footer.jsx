import PropTypes from 'prop-types';
import { Link, NavLink } from "react-router"

export default function Footer({ navRoutes }) {

  return (<>
    <footer className="bg-gray-50">
      <div className="container py-5">
        <div className="border-bottom border-gray-200 mb-4 d-flex justify-content-between">
          <div className="mb-4">
            <Link to="/">
              <img src="https://github.com/Emilyee2001/react-week5-1/blob/main/src/assets/images/logo.png?raw=true" style={{ width: '190px' }} alt="logo" />
            </Link>
            <p className="mt-2">地址：台北市中正區重慶南路1段122號</p>
            <p>統一編號：20245437</p>
          </div>
          <ul className="d-flex gap-4">
            {navRoutes.map(page => (
              <li key={page.path}>
                <NavLink to={page.path}>{page.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <p>© 2024 ExotiSpice All Rights Reserved</p>
          <p>此網站為學習使用並無商業用途</p>
          <p>隱私權政策</p>
          <p>使用者條款</p>
        </div>
      </div>
    </footer>

  </>)
}


Footer.propTypes = {
  navRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};