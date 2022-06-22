import { ROUTES } from "../../route/Routes"
import CommonPageTemplate from "../../components/templates/CommonTemplate"

export default function DatasPage() {
  //변수 초기화
  const currentPage = ROUTES.FREE
  return <CommonPageTemplate currentPage={currentPage} />
}
