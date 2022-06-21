export enum RoutePath {
  MASTER = "",
  USER = "user",
  DEVATES = "devates",
  PHILOSOPHER = "philosopher",
  SHARE = "shares",
}

export enum ActionPath {
  LOGIN = "login",
  REGISTER = "register",
  CHECK = "check",
  ADD = "add",
  EDIT = "edit",
  DETAIL = ":id",
  PHILOSOPHER = ":who",
}
