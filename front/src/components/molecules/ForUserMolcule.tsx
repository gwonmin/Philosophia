export default function ForUserMolcule({
  isYesList,
  isUser,
  stance,
  handleAgree,
  handleDisagree,
  like,
  didLike,
  handleLike,
}: {
  isYesList: boolean
  isUser: boolean
  stance: any
  handleAgree: any
  handleDisagree: any
  like: any
  didLike: any
  handleLike: any
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
              {stance === "yes" && "찬성"}
              {stance === "no" && "반대"}
              {stance === "grey" && "중립"}
            </div>
          )}
        </div>
      )}
      {like && <button onClick={handleLike}>{didLike ? "좋아요 취소" : "좋아요"}</button>}
    </>
  )
}
