import React, { useContext } from "react"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import MuiDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Mainlist from "./SidebarNavMainlist"
import Sublist from "./SidebarNavSublist"
import { Props } from "./types"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import PersonIcon from "@mui/icons-material/Person"
import { useNavigate, Link } from "react-router-dom"
import { DispatchContext, UserStateContext } from "./RootContext"
import { Menu, MenuItem, Stack } from "@mui/material"

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <a href="https://kdt-gitlab.elice.io/ai_track/class_04/ai_project/team15/ai-project-team15" target="_blank">
        Philosophia
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const mdTheme = createTheme({
  palette: {
    primary: { main: "#000080" },
  },
})

const CommonPageLayout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const navigate = useNavigate()
  const dispatch = useContext(DispatchContext) ?? null
  const user = useContext(UserStateContext)?.user ?? null
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  if (!dispatch) {
    return <p>dispatch do not exist...</p>
  }

  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken")
    // dispatch 함수를 이용해 로그아웃함.
    if (dispatch) {
      dispatch({ type: "LOGOUT" })
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleUserEdit = () => {
    setAnchorEl(null)
  }
  const handleLogOut = () => {
    setAnchorEl(null)
    logout()
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Philosophia
              </Link>
            </Typography>

            {!user?.name && (
              <IconButton color="inherit" onClick={() => navigate(`/user/login`)}>
                <VpnKeyIcon />
              </IconButton>
            )}
            {user?.name && (
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" onClick={handleMenu}>
                <IconButton color="inherit">
                  <PersonIcon />
                </IconButton>
                <Typography variant="body1" color="inherit">
                  {user?.name}
                </Typography>
              </Stack>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>로그아웃</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* sidebar */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Mainlist />
            <Divider sx={{ my: 1 }} />
            <Sublist />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* appbar */}
          <Toolbar />
          {/* contents */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* 실제 아이템 */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {children}
                </Paper>
              </Grid>
            </Grid>
            {/* copyright */}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default CommonPageLayout
