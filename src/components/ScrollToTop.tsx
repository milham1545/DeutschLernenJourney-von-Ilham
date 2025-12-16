import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas (kiri: 0, atas: 0) setiap kali pathname berubah
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;