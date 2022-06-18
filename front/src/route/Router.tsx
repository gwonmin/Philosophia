import { Route, BrowserRouter, Routes } from "react-router-dom"
import { ROUTES_ARR } from "./Routes"

export default function MyRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {ROUTES_ARR.map((el) => {
            return <Route path={el.path} element={el.component} />
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
