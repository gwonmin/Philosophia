import { ROUTES } from "../../route/Routes"
import CommonPageDetailTemplate from "../../components/templates/CommonPageDetailTemplate"

export default function DevateDetailPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  return <CommonPageDetailTemplate currentPage={currentPage} />
}
