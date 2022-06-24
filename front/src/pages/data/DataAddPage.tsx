import { ROUTES } from "../../route/Routes"
import CommonPageAddTemplate from "../../components/templates/CommonAddPageTemplate"

export default function DataAddPage() {
  //변수 초기화
  const currentPage = ROUTES.DATA
  return <CommonPageAddTemplate currentPage={currentPage} />
}
