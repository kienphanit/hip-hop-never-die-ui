import clsx from "clsx";
import BestMusic from "./BestMusic/BestMusic";
import style from "./Home.module.scss";
import Slideshow from "./Slideshow/Slideshow";

const Home = () => {
  return (
    <div className={clsx(style.wrapper)}>
      <Slideshow />
      <BestMusic />
    </div>

  );
};

export default Home;
