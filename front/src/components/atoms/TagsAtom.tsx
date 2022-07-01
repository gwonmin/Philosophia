import React from "react"
import Chip from "@mui/material/Chip"

const TagsAtom: React.FC<{ tags?: string[] }> = ({ tags }) => {
  return (
    <>
      {tags?.map((tag) => {
        return <Chip key={tag} size="small" sx={{ fontSize: 10, mr: 0.5 }} color="primary" label={`# ${tag || "(빈 태그)"}`} />
      })}
    </>
  )
}

export default TagsAtom
