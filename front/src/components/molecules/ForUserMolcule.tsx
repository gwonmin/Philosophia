import { useContext } from "react"
import { UserStateContext } from "../../pages/RootPage"

export default function ForUserMolcule({
  isYesList,
  isUser,
  didAgree,
  didDisagree,
  handleAgree,
  handleDisagree,
}: {
  isYesList: boolean
  isUser: boolean
  didAgree: any
  didDisagree: any
  handleAgree: any
  handleDisagree: any
}) {
  return (
    <>
      {isUser && (
        <div>
          <p>여기서부터는 로그인한 유저에게만 보입니다.</p>
          {isYesList && (
            <div className="devate">
              <p>찬반 토론에서만 보이는 부분입니다.</p>
              <button onClick={handleAgree}>찬성</button>
              <button onClick={handleDisagree}>반대</button>
              <div>현재 상태: </div>
              {didAgree && <div>찬성</div>}
              {didDisagree && <div>반대</div>}
              {!didAgree && !didDisagree && <div>중립</div>}
            </div>
          )}
        </div>
      )}
    </>
  )
}
