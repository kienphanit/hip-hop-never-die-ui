import clsx from "clsx";
import style from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faCompass,
  faHeartMusicCameraBolt,
  faHouse,
  faMusic,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

const Sidebar = () => {
  const item = [
    { path: "/", name: "Cá nhân", icon: faHouse },
    { path: "/explore", name: "Khám phá", icon: faCompass },
    { path: "/zingchart", name: "#zingchart", icon: faChartSimple },
    { path: "/new-music", name: "Nhạc mới", icon: faMusic },
    { path: "/categories", name: "Thể loại", icon: faHeartMusicCameraBolt },
    { path: "/top", name: "Top 100", icon: faStar },
    { path: "/tiktok", name: "Tiktok", icon: faTiktok },
  ];

 
  return (
    <div className={clsx(style.wrapper)}>
      <Link to="/" className={clsx(style.logo)}>
        Zing mp3
      </Link>
      <div className={clsx(style.list)}>
        {item.map((x, index) => {
          return (
            <Link className={clsx(style.item)} key={index} to={x.path}>
              <div className={window.location.pathname === x.path?clsx(style.line,style.lineActive):clsx(style.line)}></div>
              <div className={window.location.pathname === x.path?clsx(style.link,style.active):clsx(style.link)}>
                <FontAwesomeIcon className={clsx(style.icon)} icon={x.icon} />
                <p className={clsx(style.name)}>{x.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
