export default function ForAuthorMolcule({ isAuthor, setIsEditing, deleteHandler }: { isAuthor: boolean; setIsEditing: any; deleteHandler: any }) {
  return (
    <>
      {isAuthor && (
        <div>
          <p>여기부터는 글쓴이에게만 보입니다.</p>
          <button
            onClick={() => {
              setIsEditing(true)
            }}
          >
            수정하기
          </button>
          <button onClick={deleteHandler}>삭제하기</button>
        </div>
      )}
    </>
  )
}
