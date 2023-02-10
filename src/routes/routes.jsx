import Home from "../pages/Home/Home";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const routes = [
  { path: "/", component: Home },
  { path: "*", component: PageNotFound },
];

export { routes };
