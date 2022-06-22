import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "@mui/material"

import Header from "../../components/organisms/Header"
import { UserStateContext } from "../RootPage"
import * as Api from "../../api"
import EditDataPage from "./EditDataPage"
import ReadDataPage from "./ReadDataPage"

export default function DataPage() {
  const navigate = useNavigate()
  const params = useParams()
  const userState = useContext(UserStateContext)

  if (!userState) {
    return <p>user does not exist(even null)</p>
  }

  const [isFetchCompleted, setIsFetchCompleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [somethingWasChanged, setSomethingWasChanged] = useState(false)
  const [dataInfo, setDataInfo] = useState({
    title: "",
    content: "",
    tag: "",
    author: { _id: "", name: "", email: "" },
    createdAt: "",
    updatedAt: "",
    yesCount: 0,
    noCount: 0,
  })

  const fetchData = async (dataId: string | undefined) => {
    try {
      const res = await Api.get({ endpoint: "datatopics", params: dataId })
      if (res.data) {
        setDataInfo(res.data)
      }
      console.log("토론 정보를 정상적으로 받아왔습니다.", "color: #d93d1a;")
      console.log(res.data)
    } catch {
      console.log("토론 정보를 받아오는 데에 실패했습니다.", "color: #d93d1a;")
    }
    setIsFetchCompleted(true)
  }

  const dataId = params.id

  useEffect(() => {
    if (dataId) {
      // URI에서 토론의 Id값을 받아옵니다.
      console.log(dataId)
      fetchData(dataId)
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
        <EditDataPage setIsEditing={setIsEditing} dataInfo={dataInfo} setDataInfo={setDataInfo} />
      ) : (
        <ReadDataPage
          setIsEditing={setIsEditing}
          dataInfo={dataInfo}
          somethingWasChanged={somethingWasChanged}
          setSomethingWasChanged={setSomethingWasChanged}
        />
      )}
    </Container>
  )
}
