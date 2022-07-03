import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import { ROUTES } from "../../route/Routes"
import { RoutePath, ActionPath } from "../../route/RoutesURL"
import { UserStateContext, DispatchContext } from "../../RootContext"
import { HeaderText } from "../atoms/textboxs"
import Divider from "@mui/material/Divider/Divider"
import Stack from "@mui/material/Stack"

export default function Footer() {
  const navigate = useNavigate()

  return (
    <div>
      <p></p>
      <Divider />
      15Ya{" "}
      <a
        href="https://kdt-gitlab.elice.io/ai_track/class_04/ai_project/team15/ai-project-team15"
        target="_blank"
      >
        GitLab
      </a>
    </div>
  )
}
