import { ROUTES } from "../../route/Routes"
import CommonPageDetailTemplate from "../../components/templates/CommonDetailPageTemplate"

export default function PhilosopherDetailPage() {
  //변수 초기화
  const currentPage = ROUTES.PHILOSOPHER
  return <CommonPageDetailTemplate currentPage={currentPage} />
}
