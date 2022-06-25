import { ROUTES } from "../../route/Routes"
import CommonPageAddTemplate from "../../components/templates/CommonAddPageTemplate"

export default function FreeAddPage() {
  //변수 초기화
  const currentPage = ROUTES.FREE
  return <CommonPageAddTemplate currentPage={currentPage} />
}
