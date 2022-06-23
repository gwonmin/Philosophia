import { ROUTES } from "../../route/Routes"
import CommonPageAddTemplate from "../../components/templates/CommonPageAddTemplate"

export default function PhilosopherAddPage() {
  //변수 초기화
  const currentPage = ROUTES.PHILOSOPHER
  return <CommonPageAddTemplate currentPage={currentPage} />
}
