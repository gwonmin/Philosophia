import MasterPage from "../pages/MasterPage"

import RegisterPage from "../pages/user/RegisterPage"
import LoginPage from "../pages/user/LoginPage"
import CheckUserPage from "../pages/user/CheckUserPage"
import EditUserInfoPage from "../pages/user/EditUserInfoPage"

import AddDevatePage from "../pages/devate/AddDevatePage"
import DevateListPage from "../pages/devate/DevateListPage"
import DevatePage from "../pages/devate/DevatePage"

import AddPostPage from "../pages/philosopher/AddPostPage"
import PostListPage from "../pages/philosopher/PostListPage"
import PostPage from "../pages/philosopher/PostPage"

import AddSharePage from "../pages/share/AddSharePage"
import ShareListPage from "../pages/share/ShareListPage"
import SharePage from "../pages/share/SharePage"

import { RoutePath, ActionPath } from "./RoutesURL"

interface ROUTE {
  path: string | undefined
  component: any
  label: string
}
interface INDEX_SIGNITURE {
  [key: string]: any
}

interface ALL_ROUTE extends INDEX_SIGNITURE {
  DEFAULT: ROUTE
}
interface COMMON_ROUTE extends ALL_ROUTE {
  POST: ROUTE
  DETAIL: ROUTE
}
interface USER_ROUTE extends ALL_ROUTE {
  REGISTER: ROUTE
  LOGIN: ROUTE
  EDIT: ROUTE
  CHECK: ROUTE
}
interface PHILOSOPHER_ROUTE extends COMMON_ROUTE {
  PHILOSOPHER: ROUTE
}

interface ROUTES_GROUP extends INDEX_SIGNITURE {
  MASTER: ALL_ROUTE
  USER: USER_ROUTE
  DEVATES: COMMON_ROUTE
  PHILOSOPHER: PHILOSOPHER_ROUTE
  SHARE: COMMON_ROUTE
}

export const ROUTES: ROUTES_GROUP = {
  MASTER: {
    DEFAULT: {
      path: RoutePath.MASTER,
      component: MasterPage,
      label: "마스터",
    },
  },
  USER: {
    DEFAULT: {
      path: RoutePath.USER,
      component: undefined,
      label: "마이",
    },
    REGISTER: {
      path: ActionPath.REGISTER,
      component: RegisterPage,
      label: "회원가입",
    },
    LOGIN: {
      path: ActionPath.LOGIN,
      component: LoginPage,
      label: "로그인",
    },
    EDIT: {
      path: ActionPath.EDIT,
      component: EditUserInfoPage,
      label: "회원정보 수정",
    },
    CHECK: {
      path: ActionPath.CHECK,
      component: CheckUserPage,
      label: "본인 확인",
    },
  },
  DEVATES: {
    DEFAULT: {
      path: RoutePath.DEVATES,
      component: DevateListPage,
      label: "토론 목록",
    },
    POST: {
      path: ActionPath.ADD,
      component: AddDevatePage,
      label: "토론 등록",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: DevatePage,
      label: "토론 상세 정보",
    },
  },
  PHILOSOPHER: {
    DEFAULT: {
      path: RoutePath.PHILOSOPHER,
      component: PostListPage,
      label: "철학자 전체",
    },
    PHILOSOPHER: {
      path: ActionPath.PHILOSOPHER,
      component: PostListPage,
      label: "철학자",
    },
    POST: {
      path: ActionPath.PHILOSOPHER + "/" + ActionPath.ADD,
      component: AddPostPage,
      label: "글 등록",
    },
    DETAIL: {
      path: ActionPath.PHILOSOPHER + "/" + ActionPath.DETAIL,
      component: PostPage,
      label: "글 상세 정보",
    },
  },
  SHARE: {
    DEFAULT: {
      path: RoutePath.SHARE,
      component: ShareListPage,
      label: "글 공유",
    },
    POST: {
      path: ActionPath.ADD,
      component: AddSharePage,
      label: "글 공유하기",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: SharePage,
      label: "공유된 글",
    },
  },
}

// derived data

export const ROUTES_ARR: any[] = []
for (const key in ROUTES) {
  for (const index in ROUTES[key]) {
    if (index === "DEFAULT") {
      ROUTES_ARR.push(ROUTES[key][index])
    } else {
      let newRoute = ROUTES[key][index]
      newRoute.path = ROUTES[key]["DEFAULT"].path + "/" + newRoute.path
      ROUTES_ARR.push(newRoute)
    }
  }
}
