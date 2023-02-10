import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import clsx from "clsx";
import style from "./Layout.module.scss";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(document.getElementsByClassName(clsx(style.content))[0].scrollTop > 0);
    };
    document.getElementsByClassName(clsx(style.content))[0].addEventListener("scroll", handleScroll);

    return () => {
      document.getElementsByClassName(clsx(style.content))[0].removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={clsx(style.wrapper)}>
      <Sidebar />
      <Header isScrolled={isScrolled} />
      <div className={clsx(style.container)}>
        <div className={clsx(style.content)}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
