/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { z2000 } from "~/components/layout/Header/InteractingBtns/components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useRef, useState } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AvatarState from "~/components/AvatarState";
import CustomBtn from "~/components/CustomButton";
import { Fab, Avatar } from "@mui/material";
import { resetFab } from "~/components/CSS";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { colorWarn, colorSuccess } from "~/components/colors";

const avatarLg = css`
    width: 160px;
    height: 160px;
`;
const indicator = css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: green;
`;
const header = css`
    height: 64px;
    padding: 24px 32px;
    background-color: rgb(246, 249, 251);
`;
const label = css`
    background: #fff;
    padding: 0 4px;
    color: #666 !important;
`;
const inpt = css`
    margin: 12px;
    font-size: 14px;
    &::before {
        display: none;
    }
    &::after {
        border-color: #aaa;
    }
`;
const on = css`
    font-size: 14px;
    font-weight: 500;
    ${colorSuccess};
    svg {
        ${colorSuccess};
    }
`;
const pending = css`
    font-size: 14px;
    ${colorWarn}
    svg {
        ${colorWarn};
    }
`;
const off = css`
    font-size: 14px;
    color: #999;
    svg {
        color: #999;
    }
`;
const mw80 = css`
    min-width: 80px;
`;
const save = css`
    ${mw80}
    color: #fff;
    &:active {
        background-color: rgb(79, 70, 229) !important;
    }
`;
const drawer = css`
    width: 400px;
    transform: translateX(-100%);
    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;
const coverCSS = css`
    ${z2000}
    display: none;
    opacity: 0;
    background: rgba(0, 0, 0, 0.6);
    transition: opacity 250ms ease-in-out;
`;

function ProfileDrawer() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const cover = useRef<HTMLDivElement>(null);
    const drawerDOM = useRef<HTMLDivElement>(null);
    const backBtn = useRef<HTMLDivElement>(null);
    const cancelBtn = useRef<HTMLDivElement>(null);
    const avatarDiv = useRef<HTMLDivElement>(null);
    const handleClose = () => {
        drawerDOM.current!.style.transform = "translateX(-100%)";
        cover.current!.style.opacity = "0";
        setTimeout(() => {
            cover.current!.style.display = "none";
        }, 250);
    };
    const handleOpen = () => {
        cover.current!.style.display = "block";
        setTimeout(() => {
            drawerDOM.current!.style.transform = "translateX(0)";
            cover.current!.style.opacity = "1";
        });
    };
    useEffect(() => {
        cover.current!.onclick = (e) => {
            if (!e.defaultPrevented) handleClose();
        };
        drawerDOM.current!.onclick = (e) => e.preventDefault();
        backBtn.current!.onclick = handleClose;
        cancelBtn.current!.onclick = handleClose;
        avatarDiv.current!.onclick = handleOpen;
    }, []);
    return (
        <>
            <div onClick={toggleDrawer} className="flex items-center justify-between mb-4">
                <div ref={avatarDiv} className="flex items-center cursor-pointer">
                    <AvatarState state="on" alt="photo" />
                    <div className="ml-4">Pham Quoc Dat</div>
                </div>
                <div className="-mr-5">
                    <CustomBtn>
                        <MoreVertOutlinedIcon />
                    </CustomBtn>
                </div>
            </div>
            <div ref={cover} className="absolute w-full h-full left-0 top-0 bg-black" css={coverCSS}>
                <div ref={drawerDOM} className="overflow-hidden bg-white h-full" css={drawer}>
                    <div className="overflow-auto h-full">
                        <div className="flex items-center border-b border-solid" css={header}>
                            <div ref={backBtn}>
                                <Fab css={resetFab} style={{ width: "40px", height: "40px" }}>
                                    <ArrowBackIosIcon className="font-s20" />
                                </Fab>
                            </div>
                            <div className="text-xl font-medium ml-4">Profile</div>
                        </div>
                        <div className="relative rounded-full w-fit mx-auto my-8">
                            <Avatar css={avatarLg} />
                            <div className="absolute indicator right-4 bottom-5" css={indicator}></div>
                        </div>
                        <div className="px-6">
                            <div className="flex flex-col gap-6 border border-solid border-gray-300 rounded hover:border-gray-500 mb-4">
                                <FormControl variant="outlined" required>
                                    <InputLabel htmlFor="name" css={label}>
                                        Name
                                    </InputLabel>
                                    <Input
                                        autoFocus
                                        placeholder="Name"
                                        css={inpt}
                                        id="name"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle className="font-s20" />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="flex flex-col gap-6 border border-solid border-gray-300 rounded hover:border-gray-500 mb-4">
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="email" css={label}>
                                        Email
                                    </InputLabel>
                                    <Input
                                        value="admin1234@gmail.com"
                                        placeholder="Email"
                                        css={inpt}
                                        id="email"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EmailIcon className="font-s20" />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="flex flex-col gap-6 border border-solid border-gray-300 rounded hover:border-gray-500 mb-4">
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="about" css={label}>
                                        About
                                    </InputLabel>
                                    <Input
                                        value="I'm a developer"
                                        placeholder="About"
                                        css={inpt}
                                        id="about"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <CakeIcon className="font-s20" />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="mt-6">
                                <div className="text-sm opacity-70">Status</div>
                                <FormControl>
                                    <RadioGroup defaultValue="on">
                                        <FormControlLabel css={on} value="on" control={<Radio />} label="Active" />
                                        <FormControlLabel
                                            css={pending}
                                            value="pending"
                                            control={<Radio />}
                                            label="Pending"
                                        />
                                        <FormControlLabel css={off} value="off" control={<Radio />} label="Offline" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="flex py-6 justify-end gap-2">
                                <div ref={cancelBtn}>
                                    <CustomBtn css={mw80}>Cancel</CustomBtn>
                                </div>
                                <div onClick={handleClose}>
                                    <CustomBtn css={save} className="bg-darkPurple text-white">
                                        Save
                                    </CustomBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileDrawer;
