import MasterPage from "../pages/MasterPage"

import RegisterPage from "../pages/user/RegisterPage"
import LoginPage from "../pages/user/LoginPage"
import CheckUserPage from "../pages/user/CheckUserPage"
import EditUserInfoPage from "../pages/user/EditUserInfoPage"

import DevatesPage from "../pages/devate/DevatesPage"
import DevateAddPage from "../pages/devate/DevateAddPage"
import DevateDetailPage from "../pages/devate/DevateDetailPage"

import PhilosopherPage from "../pages/philosopher/PhilosopherPage"
import PhilosopherAddPage from "../pages/philosopher/PhilosopherAddPage"
import PhilosopherDetailPage from "../pages/philosopher/PhilosopherDetailPage"

import AddSharePage from "../pages/share/AddSharePage"
import ShareListPage from "../pages/share/ShareListPage"
import SharePage from "../pages/share/SharePage"

import AddFreePage from "../pages/free/AddFreePage"
import FreesPage from "../pages/free/FreesPage"
import FreePage from "../pages/free/FreePage"

import { RoutePath, ActionPath } from "./RoutesURL"

//배열화를 위해 인덱스 시그니쳐 설정
interface INDEX_SIGNITURE {
  [key: string]: any
}

//가장 기본적인 최소 타입 정의
interface ROUTE {
  path: string | undefined
  component: any
  label: string
}

//타입별 서브 루트 명시
interface ALL_ROUTE extends INDEX_SIGNITURE {
  DEFAULT: ROUTE
}

export interface COMMON_ROUTE extends ALL_ROUTE {
  POST: ROUTE
  DETAIL: ROUTE
}
export interface USER_ROUTE extends ALL_ROUTE {
  REGISTER: ROUTE
  LOGIN: ROUTE
  EDIT: ROUTE
  CHECK: ROUTE
}

//메인 루트 목록 명시
interface ROUTES_GROUP extends INDEX_SIGNITURE {
  MASTER: ALL_ROUTE
  USER: USER_ROUTE
  DEVATES: COMMON_ROUTE
  PHILOSOPHER: COMMON_ROUTE
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
      component: DevatesPage,
      label: "토론 목록",
    },
    POST: {
      path: ActionPath.ADD,
      component: DevateAddPage,
      label: "토론 등록",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: DevateDetailPage,
      label: "토론 상세 정보",
    },
  },
  PHILOSOPHER: {
    DEFAULT: {
      path: RoutePath.PHILOSOPHER,
      component: PhilosopherPage,
      label: "철학자",
    },
    POST: {
      path: ActionPath.ADD,
      component: PhilosopherAddPage,
      label: "글 등록",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: PhilosopherDetailPage,
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
  FREE: {
    DEFAULT: {
      path: RoutePath.FREE,
      component: FreesPage,
      label: "자유 주제 토론",
    },
    POST: {
      path: ActionPath.ADD,
      component: AddFreePage,
      label: "토론 작성",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: FreePage,
      label: "토론 상세 정보",
    },
  },
  DATA: {
    DEFAULT: {
      path: RoutePath.DATA,
      component: FreesPage,
      label: "자유 주제 토론",
    },
    POST: {
      path: ActionPath.ADD,
      component: AddFreePage,
      label: "토론 작성",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: FreePage,
      label: "토론 상세 정보",
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
