import { ROUTES } from "../../route/Routes"
import CommonPageAddTemplate from "../../components/templates/CommonAddPageTemplate"

export default function DevateAddPage() {
  //변수 초기화
  const currentPage = ROUTES.DEVATES
  return <CommonPageAddTemplate currentPage={currentPage} />
}
