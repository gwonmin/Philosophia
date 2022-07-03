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
    await Api.put({ endpoint: endpoint, data: data })
    alert("수정에 성공했습니다.")
    callback()
  } catch (err) {
    alert("수정에 실패하였습니다.")
  }
}
const handleDelete = async ({ endpoint, id, callback }: { endpoint: string; id: string; callback: any }) => {
  if (id) {
    try {
      await Api.delete({ endpoint: endpoint, params: id })
      alert(`삭제에 성공하였습니다.`)
      callback()
    } catch (err) {
      alert(`삭제에 실패했습니다.`)
    }
  } else {
    alert("존재하지 않는 글입니다.")
  }
}
const handleStance = async ({
  id,
  stance,
  changeStance,
  value,
  callback,
}: {
  stance: any
  changeStance: string
  id: string
  value: boolean
  callback: Dispatch<SetStateAction<boolean>>
}) => {
  const isYes = changeStance === "yes"
  if (stance === changeStance) {
    alert(isYes ? "이미 찬성하셨습니다." : "이미 반대하셨습니다.")
    return
  }
  try {
    await Api.put({
      endpoint: `devates/${id}/stance`,
      data: { stance: isYes ? 1 : 0 },
    })
    alert(`${isYes ? "찬성" : "반대"}하였습니다.`)
  } catch (err) {
    alert(`${isYes ? "찬성" : "반대"}에 실패하였습니다.`)
  }
  callback(!value)
  return false
}

//endpoint에 get 요청을 보내고 value를 설정한 뒤 callback(setIsFetched)을 실행합니다.
async function customFetch({ endpoint, setValue, callback }: { endpoint: string; setValue: Function; callback: Dispatch<SetStateAction<boolean>> }) {
  setValue([])
  try {
    // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
    const res = await Api.get({ endpoint: endpoint })
    if (res.data) {
      setValue(res.data)
    }
  } catch {
    if (endpoint !== "user/current") alert("데이터를 받아오는 데에 실패했습니다. 새로고침을 해주세요.")
  }
  callback(true)
}

const formatDateString = (dateString: string) => {
  const d = new Date(dateString)
  const fullYear = d.getFullYear()
  const month = String(d.getMonth() + 1).length !== 2 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
  const date = String(d.getDate()).length !== 2 ? `0${d.getDate()}` : d.getDate()
  const hours = String(d.getHours()).length !== 2 ? `0${d.getHours()}` : d.getHours()
  const minutes = String(d.getMinutes()).length !== 2 ? `0${d.getMinutes()}` : d.getMinutes()
  const seconds = String(d.getSeconds()).length !== 2 ? `0${d.getSeconds()}` : d.getSeconds()

  return `${fullYear}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

export { handleChange, handleEdit, handleDelete, handleStance, customFetch, formatDateString }
