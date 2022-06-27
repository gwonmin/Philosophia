import { ROUTES } from "../../route/Routes"
import SideBarPageTemplate from "../../components/templates/SideBarPageTemplate"

export default function PhilosopherPage() {
  //변수 초기화
  const currentPage = ROUTES.PHILOSOPHER
  return <SideBarPageTemplate currentPage={currentPage} />
}
