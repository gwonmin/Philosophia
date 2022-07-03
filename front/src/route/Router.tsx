import { Route, BrowserRouter, Routes } from "react-router-dom"
import CommonPageLayout from "../CommonPageLayout"
import TrendPageLayout from "../TrendPageLayout"
import { ROUTES_ARR } from "./Routes"
import { RoutePath } from "./RoutesURL"

export default function MyRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES_ARR.map((el) => {
          return (
            <Route
              key={el.path ?? ""}
              path={el.path ?? ""}
              element={
                el.path === RoutePath.TREND ? (
                  <TrendPageLayout>
                    <el.component />
                  </TrendPageLayout>
                ) : (
                  (
                    <CommonPageLayout>
                      <el.component />
                    </CommonPageLayout>
                  ) ?? <p>컴포넌트가 없습니다.</p>
                )
              }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}
