export enum RoutePath {
  MASTER = "",
  USER = "user",
  DEVATES = "devates",
  PHILOSOPHER = ":who",
  SHARE = "shares",
  FREE = "freetopics",
  DATA = "data",
}

export enum ActionPath {
  //User Action
  LOGIN = "login",
  REGISTER = "register",
  CHECK = "check",
  //Common Action
  ADD = "add",
  EDIT = "edit",
  DETAIL = ":id",
}
