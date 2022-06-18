import { Route, BrowserRouter, Routes } from "react-router-dom"
import { ROUTES_ARR } from "./Routes"

export default function MyRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {ROUTES_ARR.map((el) => {
            return <Route key={el.path ?? ""} path={el.path ?? ""} element={<el.component /> ?? <p>컴포넌트가 없습니다.</p>} />
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
