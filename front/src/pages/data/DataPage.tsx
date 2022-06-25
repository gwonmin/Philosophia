import { ROUTES } from "../../route/Routes"
import CommonTemplate from "../../components/templates/CommonPageTemplate"

export default function DataPage() {
  //변수 초기화
  const currentPage = ROUTES.DATA
  return <CommonTemplate currentPage={currentPage} />
}
