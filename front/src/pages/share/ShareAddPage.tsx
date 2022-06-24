import { ROUTES } from "../../route/Routes"
import CommonPageAddTemplate from "../../components/templates/CommonAddPageTemplate"

export default function ShareAddPage() {
  //변수 초기화
  const currentPage = ROUTES.SHARE
  return <CommonPageAddTemplate currentPage={currentPage} />
}
