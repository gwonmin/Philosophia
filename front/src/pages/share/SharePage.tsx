import { ROUTES } from "../../route/Routes"
import SideBarPageTemplate from "../../components/templates/SideBarPageTemplate"

export default function SharePage() {
  //변수 초기화
  const currentPage = ROUTES.SHARE
  return <SideBarPageTemplate currentPage={currentPage} />
}
