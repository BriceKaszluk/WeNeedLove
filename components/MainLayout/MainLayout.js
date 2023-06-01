import React from "react";
import styles from "./styles/MainLayout.module.scss";
import CookieBanner from "../common/CookieBanner";
import { useRouter } from 'next/router';

export default function MainLayout({ children, session }) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const [width, setWidth] = React.useState(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
    
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
  
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = width <= 768;

  const bgStyle = !isHome && !isMobile ? { backgroundImage: "url('/main_background.jpg')", backgroundPosition: "center" } : {};

  return (
    <div className={`${styles.wrap} bg-blue-200 flex flex-col justify-center items-center`} style={bgStyle}>
      <CookieBanner />
      {children}
    </div>
  );
}
