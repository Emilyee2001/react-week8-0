// 問GPT的

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 每次路徑變化就滾到最上面
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
