export enum RoutePath {
  MASTER = "",
  USER = "user",
  DEVATES = "devates",
  PHILOSOPHER = "philosopher",
  SHARE = "shares",
  FREE = "freetopics",
  DATA = "data",
}

export enum ActionPath {
  //User Action
  LOGIN = "login",
  REGISTER = "register",
  CHECK = "check",
  //Philosopher Action
  PHILOSOPHER = ":who",
  //Common Action
  ADD = "add",
  EDIT = "edit",
  DETAIL = ":id",
}
