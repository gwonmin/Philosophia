import { ROUTES } from "../../route/Routes"
import DetailCommonTemplate from "../../components/templates/DetailCommonTemplate"

export default function DevatesPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  return <DetailCommonTemplate currentPage={currentPage} />
}
