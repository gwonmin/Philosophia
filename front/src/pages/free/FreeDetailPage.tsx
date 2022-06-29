import { ROUTES } from "../../route/Routes"
import CommonPageDetailTemplate from "../../components/templates/CommonDetailPageTemplate"

export default function FreeDetailPage() {
  //변수 초기화
  const currentPage = ROUTES.FREE
  return <CommonPageDetailTemplate currentPage={currentPage} />
}
