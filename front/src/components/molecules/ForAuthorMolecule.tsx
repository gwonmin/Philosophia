import { Box, Button } from "@mui/material"

export default function ForAuthorMolcule({ isAuthor, setIsEditing, deleteHandler }: { isAuthor: boolean; setIsEditing: any; deleteHandler: any }) {
  return (
    <>
      {isAuthor && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ mr: 2 }}
            variant="outlined"
            onClick={() => {
              setIsEditing(true)
            }}
          >
            수정하기
          </Button>
          <Button variant="outlined" color="error" onClick={deleteHandler}>
            삭제하기
          </Button>
        </Box>
      )}
    </>
  )
}
