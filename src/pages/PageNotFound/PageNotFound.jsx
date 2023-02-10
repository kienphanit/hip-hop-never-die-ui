import clsx from "clsx";
import style from "./PageNotFound.module.scss";

const PageNotFound = () => {
    return ( 
        <div className={clsx(style.wrapper)}>
            <h1>Page Not Found</h1>
        </div>
     );
}
 
export default PageNotFound;