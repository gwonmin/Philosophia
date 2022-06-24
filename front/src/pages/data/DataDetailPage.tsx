import { ROUTES } from "../../route/Routes"
import CommonPageDetailTemplate from "../../components/templates/CommonDetailPageTemplate"

export default function DataDetailPage() {
  //변수 초기화
  const currentPage = ROUTES.DATA
  return <CommonPageDetailTemplate currentPage={currentPage} />
}
