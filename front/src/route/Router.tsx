import { Route, BrowserRouter, Routes } from "react-router-dom"
import CommonPageLayout from "../CommonPageLayout"
import { ROUTES_ARR } from "./Routes"

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
                (
                  <CommonPageLayout>
                    <el.component />
                  </CommonPageLayout>
                ) ?? <p>컴포넌트가 없습니다.</p>
              }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}
