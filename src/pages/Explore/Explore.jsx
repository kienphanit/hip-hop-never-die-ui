import clsx from "clsx";
import style from "./Explore.module.scss";
import BestMusic from "./BestMusic/BestMusic";
import Slideshow from "./Slideshow/Slideshow";

const Explore = () => {
  return ( 
    <div className={clsx(style.wrapper)}>
      <Slideshow />
      <BestMusic />
    </div>
   );
}
 
export default Explore;