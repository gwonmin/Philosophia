import MasterPage from "../components/pages/MasterPage";
import LoginPage from "../components/pages/user/LoginPage";
import RegisterPage from "../components/pages/user/RegisterPage";
import { RoutePath } from "./RoutesUrl";

interface ROUTES_TYPE {
  MASTER: any;
  REGISTER: any;
  LOGIN: any;
}

export const ROUTES: ROUTES_TYPE = {
  MASTER: {
    path: RoutePath.MASTER, // => '/'
    component: MasterPage,
    link: `${RoutePath.MASTER}?search=hello`,
    label: "마스터 페이지",
  },
  REGISTER: {
    path: `${RoutePath.REGISTER}/:nationality`, // => '/register',
    component: RegisterPage,
    link: `${RoutePath.REGISTER}`,
    label: "회원가입",
  },
  LOGIN: {
    path: RoutePath.LOGIN, // => '/login',
    component: LoginPage,
    link: RoutePath.LOGIN,
    label: "로그인",
  },
};

// derived data

export const ROUTES_ARR: any[] = [];
for (const key in ROUTES) {
  ROUTES_ARR.push(ROUTES[key]);
}
