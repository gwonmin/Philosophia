import { Dispatch, SetStateAction } from "react"
import * as Api from "./api"

async function fetch({ endpoint, setValue, callback }: { endpoint: string; setValue: Function; callback: Dispatch<SetStateAction<boolean>> }) {
  try {
    // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
    const res = await Api.get({ endpoint: endpoint })
    if (res.data) {
      setValue(res.data)
    }
    console.log("토론 목록을 정상적으로 받아왔습니다.", "color: #d93d1a;")
    console.log("토론 목록: ", res.data)
  } catch {
    console.log("토론 목록을 받아오는 데에 실패했습니다.", "color: #d93d1a;")
  }
  callback(true)
}

export { fetch }
