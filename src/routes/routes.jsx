import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Artists from "../pages/Artists/Artists";

const routes = [
  { path: "/", component: Home },
  { path: "/explore", component: Explore },
  { path: "/artists", component: Artists },
  { path: "*", component: PageNotFound },
];

export { routes };
