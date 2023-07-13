/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Fab, Tooltip, Avatar, Menu, MenuItem } from "@mui/material";
import { children } from "~/types";
// icon
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import SearchIcon from "@mui/icons-material/Search";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
// img
import avatarImg from "~/assets/imgs/avatar.jpg";
import USAFlag from "~/assets/imgs/USAFlag.svg";
import TNKFlag from "~/assets/imgs/TNKFlag.svg";
import VNFlag from "~/assets/imgs/VNFlag.svg";
import { resetFab } from "../CSS";

const langPickerCSS = css`
    height: auto;
    padding: 0;
    ${resetFab}
`;

function Icon({ children }: children) {
    const wrapperStyle = css`
        width: 40px;
        height: 40px;
        ${resetFab}
    `;
    return <Fab css={wrapperStyle}>{children}</Fab>;
}

const wrapperCSS = css`
    min-height: 64px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    position: relative;
    z-index: 100;
`;
const iconCSS = css`
    color: rgba(0, 0, 0, 0.54);
`;
const itemCSS = css`
    font-size: 14px;
    color: rgb(17, 24, 39);
`;

function LanguagePicker() {
    const langs = [
        { flag: USAFlag, name: "English", short: "EN" },
        { flag: TNKFlag, name: "Turkish", short: "TR" },
        { flag: VNFlag, name: "Vietnamese", short: "VN" },
    ];
    const [active, setActive] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Fab variant="extended" css={langPickerCSS}>
            <div
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="flex gap-2 items-center px-2.5"
                css={css`
                    height: 40px;
                `}
            >
                <img src={langs[active].flag} alt="flag" />
                <span>{langs[active].short}</span>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {langs.map((lang, index) => (
                    <MenuItem
                        css={itemCSS}
                        key={index}
                        onClick={() => {
                            setActive(index);
                            handleClose();
                        }}
                    >
                        <div className="flex gap-4">
                            <img src={lang.flag} alt={lang.name} />
                            <div>{lang.name}</div>
                        </div>
                    </MenuItem>
                ))}
            </Menu>
        </Fab>
    );
}

function Profile() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    return (
        <Fab variant="extended" css={resetFab}>
            <div
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="flex items-end"
            >
                <div className="capitalize mr-2 text-right">
                    <div className="text-sm font-bold">Phạm Quốc Đạt</div>
                    <div
                        className="text-xs"
                        css={css`
                            color: rgb(107, 114, 128);
                        `}
                    >
                        Admin
                    </div>
                </div>
                <Avatar src={avatarImg} alt="avatar" sizes="small" />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem css={itemCSS}>
                    <div className="flex gap-3">
                        <AccountCircleOutlinedIcon />
                        <div>My Profile</div>
                    </div>
                </MenuItem>
                <MenuItem css={itemCSS}>
                    <div className="flex gap-3">
                        <DraftsOutlinedIcon />
                        <div>Inbox</div>
                    </div>
                </MenuItem>
                <MenuItem css={itemCSS}>
                    <div className="flex gap-3">
                        <LogoutIcon />
                        <div>Sign out</div>
                    </div>
                </MenuItem>
            </Menu>
        </Fab>
    );
}

function Header() {
    const openLeftSB = useRef<HTMLDivElement>(null);
    const leftSideBar = useRef<HTMLDivElement>();
    useEffect(() => {
        // show menu icon on header
        const handlerShowMenuIcon = (e: CustomEventInit<HTMLDivElement>) => {
            if (openLeftSB.current) {
                leftSideBar.current = e.detail;
                openLeftSB.current.style.display = "inline-block";
            }
        };
        // show left sidebar
        const handleShowLeftSB = () => {
            if (leftSideBar.current) leftSideBar.current.style.margin = "0px";
            openLeftSB.current!.style.display = "none";
        };
        // mount event handler
        openLeftSB.current!.onclick = handleShowLeftSB;
        window.addEventListener("closedLeftSideBar", handlerShowMenuIcon);
        return () => {
            window.removeEventListener("closedLeftSideBar", handlerShowMenuIcon);
        };
    }, []);
    return (
        <div css={wrapperCSS} className="w-full flex items-center justify-between">
            <div className="px-4">
                <div
                    ref={openLeftSB}
                    css={css`
                        display: none;
                    `}
                >
                    <Icon>
                        <MenuIcon />
                    </Icon>
                </div>
                <Tooltip title="Calendar" placement="bottom" arrow>
                    <div className="inline-block">
                        <Icon>
                            <CalendarMonthIcon css={iconCSS} />
                        </Icon>
                    </div>
                </Tooltip>
                <Tooltip title="Contacts" placement="bottom" arrow>
                    <div className="inline-block">
                        <Icon>
                            <GroupsIcon css={iconCSS} />
                        </Icon>
                    </div>
                </Tooltip>
                <Tooltip title="Mail" placement="bottom" arrow>
                    <div className="inline-block">
                        <Icon>
                            <MailOutlineIcon css={iconCSS} />
                        </Icon>
                    </div>
                </Tooltip>
                <Tooltip title="Click to add/remove shortcut" placement="bottom" arrow>
                    <div className="inline-block">
                        <Icon>
                            <StarIcon
                                css={css`
                                    color: rgb(255, 179, 0);
                                `}
                            />
                        </Icon>
                    </div>
                </Tooltip>
            </div>
            <div className="px-2">
                <LanguagePicker />
                <Icon>
                    <FormatSizeIcon css={iconCSS} />
                </Icon>
                <Tooltip title="Fullscreen Toggle" placement="bottom" arrow>
                    <div className="inline-block">
                        <Icon>
                            <FullscreenIcon css={iconCSS} />
                        </Icon>
                    </div>
                </Tooltip>
                <Tooltip title="Click to search" placement="bottom" arrow>
                    <div className="inline-block">
                        <Icon>
                            <SearchIcon css={iconCSS} />
                        </Icon>
                    </div>
                </Tooltip>
                <Icon>
                    <TurnedInNotIcon css={iconCSS} />
                </Icon>
                <Icon>
                    <Badge color="primary" variant="dot">
                        <NotificationsNoneOutlinedIcon css={iconCSS} />
                    </Badge>
                </Icon>
                <Profile />
            </div>
        </div>
    );
}

export default Header;
