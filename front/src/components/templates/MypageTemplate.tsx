import Header from "../organisms/Header"
import Footer from "../organisms/Footer"

import UserDetail from "../organisms/UserDetail"
import UserInfoCardMolecule from "../organisms/UserInfoCardMolecule"

import { Typography } from "@mui/material"

export default function MypageTemplate({userInfo}: any){
    return <>
        <Header />
        <Typography variant="h1">Mypage</Typography>
        <UserInfoCardMolecule />
        <UserDetail />
        <Footer />
    </>
}