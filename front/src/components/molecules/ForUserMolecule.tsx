export default function ForUserMolcule({
  postInfo,
  isUser,
  handleChangeStance,
  handleLike,
}: {
  postInfo: any
  isUser: boolean
  handleChangeStance: any
  handleLike: any
}) {
  return (
    <>
      {isUser && (
        <div>
          <p>여기서부터는 로그인한 유저에게만 보입니다.</p>
          {postInfo.yes && (
            <div className="devate">
              <>
                <p>찬반 토론에서만 보이는 부분입니다.</p>
                <button onClick={() => handleChangeStance("yes")}>찬성</button>
                <button onClick={() => handleChangeStance("no")}>반대</button>
                <div>현재 상태: </div>
              </>
              {postInfo.userStance === "yes" && "찬성"}
              {postInfo.userStance === "no" && "반대"}
              {postInfo.userStance === "grey" && "중립"}
            </div>
          )}
        </div>
      )}
      {postInfo.like && <button onClick={handleLike}>{postInfo.userLike === true ? "좋아요 취소" : "좋아요"}</button>}
    </>
  )
}
