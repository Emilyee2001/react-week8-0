import PropTypes from 'prop-types';

function Pagination({pageInfo, getData}) {
  // 處理換分頁
  const handlePageChange = (page) => {
    getData(page);
  }

  return (<>
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a onClick={(e) => { e.preventDefault(); handlePageChange(pageInfo.current_page - 1) }} className={`page-link ${!pageInfo.has_pre && 'disabled'}`} style={{ cursor: 'pointer' }}>
              上一頁
            </a>
          </li>
          {[...Array(pageInfo.total_pages).keys()].map(page => (
            <li key={page + 1} className="page-item">
              <a onClick={(e) => { e.preventDefault(); handlePageChange(page + 1) }} className={`page-link ${pageInfo.current_page == page + 1 && 'active'}`} style={{ cursor: pageInfo.current_page == page + 1 ? 'not-allowed' : 'pointer' }}>
                {page + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a onClick={(e) => { e.preventDefault(); handlePageChange(pageInfo.current_page + 1) }} className={`page-link ${!pageInfo.has_next && 'disabled'}`} style={{ cursor: 'pointer' }}>
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </>)
}

Pagination.propTypes = {
  pageInfo: PropTypes.shape({
    current_page: PropTypes.number.isRequired,
    has_pre: PropTypes.bool.isRequired,
    has_next: PropTypes.bool.isRequired,
    total_pages: PropTypes.number.isRequired,
  }).isRequired,
  getData: PropTypes.func.isRequired,
};

export default Pagination;