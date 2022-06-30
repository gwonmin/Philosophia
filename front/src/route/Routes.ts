import MyPage from "../pages/user/MyPage"
import RegisterPage from "../pages/user/RegisterPage"
import LoginPage from "../pages/user/LoginPage"
import CheckUserPage from "../pages/user/CheckUserPage"
import EditUserInfoPage from "../pages/user/EditUserInfoPage"

import TrendPage from "../pages/TrendPage"

import DevatesPage from "../pages/devate/DevatesPage"
import DevateAddPage from "../pages/devate/DevateAddPage"
import DevateDetailPage from "../pages/devate/DevateDetailPage"

import PhilosopherPage from "../pages/philosopher/PhilosopherPage"
import PhilosopherAddPage from "../pages/philosopher/PhilosopherAddPage"
import PhilosopherDetailPage from "../pages/philosopher/PhilosopherDetailPage"

import SharePage from "../pages/share/SharePage"
import ShareAddPage from "../pages/share/ShareAddPage"
import ShareDetailPage from "../pages/share/ShareDetailPage"

import DataPage from "../pages/data/DataPage"
import DataAddPage from "../pages/data/DataAddPage"
import DataDetailPage from "../pages/data/DataDetailPage"

import FreePage from "../pages/free/FreePage"
import FreeAddPage from "../pages/free/FreeAddPage"
import FreeDetailPage from "../pages/free/FreeDetailPage"

import { RoutePath, ActionPath } from "./RoutesURL"

//가장 기본적인 최소 타입 정의
interface ROUTE_WITHOUT_COMPONENT {
  path?: string
  label: string
}

interface ROUTE extends ROUTE_WITHOUT_COMPONENT {
  component: any
}

// 배열화를 위한 인덱스 시그니쳐
interface INDEX_SIGNITURED_ROUTE {
  [key: string]: ROUTE
}

//타입별 서브 루트 명시
export interface ALL_ROUTE extends INDEX_SIGNITURED_ROUTE {
  DEFAULT: ROUTE
}

// export interface COMMON_ROUTE extends ALL_ROUTE {
//   POST: ROUTE
//   DETAIL: ROUTE
// }
// export interface USER_ROUTE extends ALL_ROUTE {
//   REGISTER: ROUTE
//   LOGIN: ROUTE
//   EDIT: ROUTE
//   CHECK: ROUTE
// }

//메인 루트 목록 명시
interface ROUTES_GROUP {
  USER: ALL_ROUTE
  TREND: ALL_ROUTE
  DEVATES: ALL_ROUTE
  PHILOSOPHER: ALL_ROUTE
  SHARE: ALL_ROUTE
  [key: string]: ALL_ROUTE
}

interface ROUTES_PATH {
  DEFAULT: ROUTE_WITHOUT_COMPONENT
  [key: string]: ROUTE_WITHOUT_COMPONENT
}

interface ROUTES_PATH_GROUP {
  [key: string]: ROUTES_PATH
}

export const ROUTES_PATH_MAP: ROUTES_PATH_GROUP = {
  USER: {
    DEFAULT: {
      path: RoutePath.USER,

      label: "마이",
    },
    REGISTER: {
      path: ActionPath.REGISTER,

      label: "회원가입",
    },
    LOGIN: {
      path: ActionPath.LOGIN,

      label: "로그인",
    },
    EDIT: {
      path: ActionPath.EDIT,

      label: "회원정보 수정",
    },
    CHECK: {
      path: ActionPath.CHECK,

      label: "본인 확인",
    },
  },
  TREND: {
    DEFAULT: {
      path: RoutePath.TREND,

      label: "트렌드",
    },
  },
  DEVATES: {
    DEFAULT: {
      path: RoutePath.DEVATES,

      label: "토론 목록",
    },
    POST: {
      path: ActionPath.ADD,

      label: "토론 등록",
    },
    DETAIL: {
      path: ActionPath.DETAIL,

      label: "토론 상세 정보",
    },
  },
  PHILOSOPHER: {
    DEFAULT: {
      path: RoutePath.PHILOSOPHER,

      label: "철학자",
    },
    POST: {
      path: ActionPath.ADD,

      label: "글 등록",
    },
    DETAIL: {
      path: ActionPath.DETAIL,

      label: "글 상세 정보",
    },
  },
  SHARE: {
    DEFAULT: {
      path: RoutePath.SHARE,

      label: "글 공유",
    },
    POST: {
      path: ActionPath.ADD,

      label: "글 공유하기",
    },
    DETAIL: {
      path: ActionPath.DETAIL,

      label: "공유된 글",
    },
  },
  FREE: {
    DEFAULT: {
      path: RoutePath.FREE,

      label: "자유 주제 토론",
    },
    POST: {
      path: ActionPath.ADD,

      label: "토론 작성",
    },
    DETAIL: {
      path: ActionPath.DETAIL,

      label: "토론 상세 정보",
    },
  },
  DATA: {
    DEFAULT: {
      path: RoutePath.DATA,

      label: "자료 공유",
    },
    POST: {
      path: ActionPath.ADD,

      label: "게시글 작성",
    },
    DETAIL: {
      path: ActionPath.DETAIL,

      label: "게시글 상세 정보",
    },
  },
}

export const ROUTES: ROUTES_GROUP = {
  USER: {
    DEFAULT: {
      path: RoutePath.USER,
      component: MyPage,
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
  TREND: {
    DEFAULT: {
      path: RoutePath.TREND,
      component: TrendPage,
      label: "트렌드",
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
      component: SharePage,
      label: "글 공유",
    },
    POST: {
      path: ActionPath.ADD,
      component: ShareAddPage,
      label: "글 공유하기",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: ShareDetailPage,
      label: "공유된 글",
    },
  },
  FREE: {
    DEFAULT: {
      path: RoutePath.FREE,
      component: FreePage,
      label: "자유 주제 토론",
    },
    POST: {
      path: ActionPath.ADD,
      component: FreeAddPage,
      label: "토론 작성",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: FreeDetailPage,
      label: "토론 상세 정보",
    },
  },
  DATA: {
    DEFAULT: {
      path: RoutePath.DATA,
      component: DataPage,
      label: "자료 공유",
    },
    POST: {
      path: ActionPath.ADD,
      component: DataAddPage,
      label: "게시글 작성",
    },
    DETAIL: {
      path: ActionPath.DETAIL,
      component: DataDetailPage,
      label: "게시글 상세 정보",
    },
  },
}

// derived data
export const ROUTES_ARR: ROUTE[] = []

for (const key in ROUTES) {
  for (const index in ROUTES[key]) {
    // routes_arr
    let newRoute = ROUTES[key][index]
    if (index === "DEFAULT") {
      // ex) "user"
      ROUTES_ARR.push(newRoute)
    } else {
      // ex) "user" + "/" + "register"
      newRoute.path = ROUTES[key]["DEFAULT"].path + "/" + newRoute.path
      ROUTES_ARR.push(newRoute)
    }
    // routes_path_group
  }
}
