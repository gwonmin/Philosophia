import React from "react"
import Chip from "@mui/material/Chip"

const TagsAtom: React.FC<{ tags?: string[] | string }> = ({ tags }) => {
  if (!tags) return <p></p>
  if (typeof tags === "string") return <Chip size="small" sx={{ fontSize: 10, mr: 0.5 }} color="primary" label={`# ${tags || "(빈 태그)"}`} />
  return (
    <>
      {tags.map((tag) => {
        return <Chip key={tag} size="small" sx={{ fontSize: 10, mr: 0.5 }} color="primary" label={`# ${tag || "(빈 태그)"}`} />
      })}
    </>
  )
}

export default TagsAtom
