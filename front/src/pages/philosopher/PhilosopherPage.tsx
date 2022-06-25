import { ROUTES } from "../../route/Routes"
import CommonTemplate from "../../components/templates/CommonPageTemplate"

export default function PhilosopherPage() {
  //변수 초기화
  const currentPage = ROUTES.PHILOSOPHER
  return <CommonTemplate currentPage={currentPage} />
}
