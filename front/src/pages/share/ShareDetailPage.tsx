import { ROUTES } from "../../route/Routes"
import CommonPageDetailTemplate from "../../components/templates/CommonDetailPageTemplate"

export default function ShareDetailPage() {
  //변수 초기화
  const currentPage = ROUTES.SHARE
  return <CommonPageDetailTemplate currentPage={currentPage} />
}
