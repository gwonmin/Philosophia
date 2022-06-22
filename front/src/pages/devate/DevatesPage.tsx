import { ROUTES } from "../../route/Routes"
import CommonTemplate from "../../components/templates/CommonTemplate"

export default function DevatesPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  return <CommonTemplate currentPage={currentPage} />
}
