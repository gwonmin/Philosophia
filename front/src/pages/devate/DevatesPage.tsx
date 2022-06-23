import { ROUTES } from "../../route/Routes"
import CommonTemplate from "../../components/templates/CommonPageTemplate"

export default function DevatesPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  return <CommonTemplate currentPage={currentPage} />
}
