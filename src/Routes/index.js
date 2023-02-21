import loadable from '@loadable/component';
import routesPath from "./routes";

const Home = loadable(() => import(/* webpackChunkName: "Home" */'./../pages/Home'));
const Login = loadable(() => import(/* webpackChunkName: "Login" */'./../pages/Login'));

const routes = [
  {
    path: routesPath.HOME,
    withHeader: true, // optional route level props
    children: [],
    exact: true,
    element: Home,
  },
  {
    path: routesPath.LOGIN,
    withHeader: false, // optional route level props
    children: [],
    exact: true,
    element: Login,
  }
];

export default routes;