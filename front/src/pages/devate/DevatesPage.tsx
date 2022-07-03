import { ROUTES } from "../../route/Routes"
import SideBarPageTemplate from "../../components/templates/SideBarPageTemplate"

export default function DevatesPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  return <SideBarPageTemplate currentPage={currentPage} />
}
