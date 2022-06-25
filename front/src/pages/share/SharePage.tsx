import { ROUTES } from "../../route/Routes"
import CommonTemplate from "../../components/templates/CommonPageTemplate"

export default function SharePage() {
  //변수 초기화
  const currentPage = ROUTES.SHARE
  return <CommonTemplate currentPage={currentPage} />
}
