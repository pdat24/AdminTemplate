/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Avatar, Menu, MenuItem, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import avatar from "~/assets/imgs/avatar.jpg";
import React from "react";
import TabNav from "./TabNav";

const wrapperCSS = css`
    overflow: auto;
    height: calc(100vh - 64px);
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background: #eee;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
            background: #ddd;
        }
    }
`;
const font20 = css`
    font-size: 20px;
`;
const headerBtnCSS = (color: string) => css`
    border-radius: 20px;
    background-color: ${color};
    color: #fff;
    padding: 8px 14px;
    text-transform: capitalize;
    &:hover {
        background-color: ${color};
    }
`;
const bellIconCSS = css`
    color: #999;
    font-size: 20px;
`;

function SelectInput() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const btnCSS = css`
        background-color: #f1f5f9;
        color: #333;
        text-transform: capitalize;
        border-radius: 12px 12px 0 0;
        padding: 6px 16px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-bottom: none;
        &:hover {
            background: rgba(17, 24, 39, 0.04);
        }
    `;
    return (
        <div>
            <Button
                css={btnCSS}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <span className="mr-1">ACME Corp. Frontend App</span>
                <ExpandMoreIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem>ACME Corp. Frontend App</MenuItem>
                <MenuItem>ACME Corp. Backend App</MenuItem>
                <MenuItem>Creapond</MenuItem>
                <MenuItem>Winthinpixels</MenuItem>
            </Menu>
        </div>
    );
}

function Project() {
    return (
        <div css={wrapperCSS}>
            <div>
                <div
                    className="px-8 flex flex-col"
                    css={css`
                        box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
                    `}
                >
                    <div className="grow my-12 ">
                        <div
                            className="flex justify-between"
                            css={css`
                                @media (max-width: 950px) {
                                    flex-direction: column;
                                    gap: 24px;
                                }
                            `}
                        >
                            <div
                                className="flex items-center"
                                css={css`
                                    @media (max-width: 680px) {
                                        flex-direction: column;
                                        gap: 12px;
                                        align-items: center;
                                    }
                                `}
                            >
                                <Avatar src={avatar} sx={{ width: "64px", height: "64px" }} />
                                <div className="ml-4">
                                    <div className="text-4xl font-medium">Welcome back, Phạm Quốc Đạt!</div>
                                    <div className="flex items-center">
                                        <NotificationsIcon css={bellIconCSS} />
                                        <div className="ml-2">You have 2 new messages and 15 new tasks</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Button
                                    color="primary"
                                    size="medium"
                                    className="rounded-3xl"
                                    css={headerBtnCSS("rgb(15, 23, 42)")}
                                >
                                    <EmailIcon style={{ fontSize: "20px" }} />
                                    <span className="ml-2">Messages</span>
                                </Button>
                                <Button
                                    color="primary"
                                    size="medium"
                                    className="rounded-3xl ml-2"
                                    css={headerBtnCSS("rgb(79, 70, 229)")}
                                >
                                    <SettingsIcon css={font20} />
                                    <span className="ml-2">Settings</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <SelectInput />
                    </div>
                </div>
            </div>
            <div>
                <TabNav />
            </div>
        </div>
    );
}

export default Project;
