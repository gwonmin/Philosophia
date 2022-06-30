import React from "react"
import Pagination from "@mui/material/Pagination"
import Box from "@mui/material/Box"

interface PaginationAtomProps {
  page: number
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

const PaginationAtom: React.FC<PaginationAtomProps> = ({ page, onChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
      <Pagination
        count={10}
        showFirstButton
        showLastButton
        shape="rounded"
        page={page}
        onChange={onChange}
      />
    </Box>
  )
}

export default PaginationAtom
