import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../../api"
import EditDevatePage from "./EditDevatePage"
import ReadDevatePage from "./ReadDevatePage"

export default function DevatePage() {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext)

  if (!userState) {
    return <p>user does not exist</p>
  }

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState(false)
  const [devateInfo, setDevateInfo] = useState({
    title: "",
    content: "",
    tag: "",
    author: { _id: "", name: "", email: "" },
    createdAt: "",
    updatedAt: "",
    yesCount: 0,
    noCount: 0,
  })

  const fetchDevate = async (devateId: string | undefined) => {
    try {
      const res = await Api.get({ endpoint: "devates", params: devateId })
      if (res.data) {
        setDevateInfo(res.data)
      }
      console.log("토론 정보를 정상적으로 받아왔습니다.", "color: #d93d1a;")
      console.log(res.data)
    } catch {
      console.log("토론 정보를 받아오는 데에 실패했습니다.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  const devateId = params.devateId

  useEffect(() => {
    if (devateId) {
      // URI에서 토론의 Id값을 받아옵니다.
      console.log(devateId)
      fetchDevate(devateId)
    } else {
      console.log("존재하지 않는 토론입니다.")
    }
  }, [params, somethingWasChanged])

  if (!isFetchCompleted) {
    return <p>loading...</p>
  }

  return (
    <Container>
      <Header />
      <p>토론 상세정보 페이지, 모드: {isEditing ? "편집" : "읽기"}</p>
      {isEditing ? (
        <EditDevatePage setIsEditing={setIsEditing} devateInfo={devateInfo} setDevateInfo={setDevateInfo} />
      ) : (
        <ReadDevatePage setIsEditing={setIsEditing} devateInfo={devateInfo} setSomethingWasChanged={setSomethingWasChanged} />
      )}
    </Container>
  )
}
