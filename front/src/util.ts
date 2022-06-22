import { Dispatch, SetStateAction } from "react"
import * as Api from "./api"

//공통적으로 쓰이는 hanlde 함수
async function handleChange({ event, someState, setSomeState }: { event: React.ChangeEvent<HTMLInputElement>; someState: any; setSomeState: any }) {
  const { name, value } = event.target
  setSomeState({
    ...someState,
    [name]: value,
  })
}
const handleEdit = async ({ endpoint, data, callback }: { endpoint: string; data: any; callback: any }) => {
  try {
    const res = await Api.put({ endpoint: endpoint, data: data })
    console.log("수정에 성공했습니다.", res.data)
    callback()
  } catch (err) {
    console.log("수정에 실패하였습니다.\n", err)
  }
}
const handleDelete = async ({ endpoint, id, callback }: { endpoint: string; id: string; callback: any }) => {
  if (id) {
    try {
      await Api.delete({ endpoint: endpoint, params: id })
      console.log(`${endpoint}의 ${id}이 삭제되었습니다.`)
      callback()
    } catch (err) {
      console.log(`${endpoint}의 ${id} 삭제에 실패했습니다.`, err)
    }
  } else {
    console.log("존재하지 않는 글입니다.")
  }
}
const handleStance = async ({
  endpoint,
  id,
  stance,
  changeStance,
  callback,
}: {
  endpoint: string
  stance: any
  changeStance: string
  id: string
  callback: any
}) => {
  if (stance == changeStance) {
    console.log(stance == "yes" ? "이미 찬성하셨습니다." : "이미 반대하셨습니다.")
    return
  }
  try {
    const res = await Api.put({ endpoint: `${endpoint}/${id}/stance`, data: { stance: changeStance } })
    callback
    console.log(`${changeStance == "yes" ? "찬성" : "반대"}하였습니다.`, res.data)
  } catch (err) {
    console.log("찬성에 실패했습니다.", err)
  }
}

//endpoint에 get 요청을 보내고 value를 설정한 뒤 callback(setIsFetched)을 실행합니다.
async function customFetch({ endpoint, setValue, callback }: { endpoint: string; setValue: Function; callback: Dispatch<SetStateAction<boolean>> }) {
  try {
    // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
    const res = await Api.get({ endpoint: endpoint })
    if (res.data) {
      setValue(res.data)
    }
    console.log("데이터를 정상적으로 받아왔습니다.", "color: #d93d1a;")
    console.log("경로: ", endpoint, "데이터: ", res.data)
  } catch {
    console.log("데이터를 받아오는 데에 실패했습니다.", "color: #d93d1a;")
  }
  callback(true)
}

export { handleChange, handleEdit, handleDelete, handleStance, customFetch }
