import React from "react"
import Box from "@mui/material/Box"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  style?: React.CSSProperties
}

const TabPanel: React.FC<TabPanelProps> = ({
  index,
  value,
  style,
  children,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={style}
    >
      {value === index && <Box sx={{ pl: 3, pr: 3 }}>{children}</Box>}
    </div>
  )
}

export default TabPanel
