import React from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
function Header({photoURL}) {
    return (
        <div class="header">
            <div className="header_logo">
                <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-cloud-multimedia-kiranshastry-gradient-kiranshastry.png" alt="" />
                <span>Locker</span>
            </div>
            <div className="header_search">
                <SearchIcon/>
                <input type="text" placeholder="Search files"/>
                <FormatAlignCenterIcon/>
            </div>
            <div className="header_icons">
                <span>
                    <HelpOutlineIcon/>
                    <SettingsIcon/>
                </span>
                <span>
                    {/* <AccountCircleIcon/> */}
                    <Avatar src={photoURL}/>
                </span>

            </div>

        </div>
    )
}

export default Header

