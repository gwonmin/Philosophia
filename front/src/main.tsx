import React from "react"
import ReactDOM from "react-dom/client"
import RootContext from "./RootContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootContext />
  </React.StrictMode>
)
