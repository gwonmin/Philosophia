import { ROUTES } from "../../route/Routes"
import AddCommonTemplate from "../../components/templates/AddCommonTemplate"

export default function DevatesPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  return <AddCommonTemplate currentPage={currentPage} />
}
