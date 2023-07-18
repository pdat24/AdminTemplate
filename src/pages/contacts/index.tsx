/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import { children } from "~/types";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { ChangeEvent, useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import cover from "~/assets/imgs/profile/36-640x480.jpg";
import { Chip, Box, Drawer } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import CustomBtn from "~/components/CustomButton";
import avt from "~/assets/imgs/avatars/male-06.jpg";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import contacts from "../../components/friends.json";

const searchBarCSS = css`
    min-width: 44px;
`;
const addBtnCSS = css`
    padding: 8px 16px;
    height: fit-content;
    color: #fff;
    z-index: 1;
    &:active {
        background: rgb(79, 70, 229) !important;
    }
`;
const infoCSS = css`
    margin-right: -640px;
    width: 640px;
    transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
`;
const avtCSS = css`
    width: 128px;
    height: 128px;
    border: 4px solid #fff;
    border-radius: 50%;
`;
const closeBtn = css`
    background-color: #aaa;
`;
const h192 = css`
    height: 192px;
`;

function Info({ Icon, children }: { Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> } & children) {
    return (
        <div className="flex items-start gap-6 mt-8">
            <Icon className="font-medium" />
            <div className="opacity-80">{children}</div>
        </div>
    );
}

function User({ name, onClick }: { name: string; onClick: () => void }) {
    const wrapper = css`
        transition: background-color 100ms;
        &:hover {
            background: rgba(0, 0, 0, 0.04);
        }
    `;
    return (
        <div css={wrapper} className="flex items-center px-8 py-4 cursor-pointer border-soild border" onClick={onClick}>
            <Avatar src={avt} />
            <div className="ml-3">
                <div className="font-medium capitalize">{name}</div>
                <div className="opacity-60 text-sm">Software Engineer</div>
            </div>
        </div>
    );
}

function UserInfoBlock({ onToggle }) {
    const wrapper = useRef<HTMLDivElement>(null);
    const name = useRef<HTMLDivElement>(null);
    const handleClose = () => {
        if (window.innerWidth <= 1200) onToggle();
        else if (wrapper.current) wrapper.current.style.marginRight = "-640px";
    };
    useEffect(() => {
        window.addEventListener("openinforblock", (e: CustomEventInit<{ username: string }>) => {
            if (name.current) name.current.innerText = e.detail!.username;
        });
    }, []);
    return (
        <div id="inforBlock" className="overflow-auto border-l z-10 border-solid" css={infoCSS} ref={wrapper}>
            <div className="bg-white">
                <div className="relative" css={h192}>
                    <img src={cover} alt="photo" className="w-full h-full object-cover" />
                    <div
                        className="absolute right-8 top-8 opacity-80 cursor-pointer p-2 rounded-full"
                        css={closeBtn}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </div>
                </div>
                <div className="px-12 pb-12">
                    <div>
                        <div className="flex justify-between">
                            <img src={avt} alt="avt" css={avtCSS} className="relative z-10 -mt-16" />
                            <CustomBtn className="bg-darkPurple self-end" css={addBtnCSS}>
                                <BlockIcon className="font-s20" />
                                <span className="ml-2">Block</span>
                            </CustomBtn>
                        </div>
                        <div className="font-bold text-3xl mt-3 capitalize" ref={name}></div>
                        <Chip label="Band" className="mt-3" />
                        <hr className="my-6" />
                        <div>
                            <Info Icon={BusinessCenterOutlinedIcon}>Track Service Worker</Info>
                            <Info Icon={ApartmentOutlinedIcon}>Futurity</Info>
                            <Info Icon={MailOutlineOutlinedIcon}>
                                <div className="bg-purple">aliceharding@mail.us</div>
                            </Info>
                            <Info Icon={CallOutlinedIcon}>+84 125 653 9842</Info>
                            <Info Icon={PlaceOutlinedIcon}>387 Holt Court, Thomasville, Alaska, PO2867</Info>
                            <Info Icon={CakeOutlinedIcon}>September 17, 1985</Info>
                            <Info Icon={SubjectOutlinedIcon}>
                                <p>
                                    Adipisicing exercitation dolor nisi ipsum nostrud anim dolore sint veniam consequat
                                    lorem sit ex commodo nostrud occaecat elit magna magna commodo incididunt laborum ad
                                    irure pariatur et sit ullamco adipisicing.
                                </p>
                                <p className="mt-6">
                                    Ullamco in dolore amet est quis consectetur fugiat non nisi incididunt id laborum
                                    adipisicing dolor proident velit ut quis aliquip dolore id anim sit adipisicing nisi
                                    incididunt enim amet pariatur.
                                </p>
                            </Info>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Contacts() {
    const initContacts = useRef(contacts);
    const [, setData] = useState(0);
    const amount = useRef(initContacts.current.length);
    const groups = useRef<object>({});
    const groupLetters = useRef<string>("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    useMemo(() => {
        amount.current = 0;
        for (const i of groupLetters.current) groups.current[i] = [];
    }, [searchText]);
    const handleShowInfoBlock = (name: string) => {
        document.getElementById("inforBlock")!.style.marginRight = "0";
        window.dispatchEvent(new CustomEvent("openinforblock", { detail: { username: name } }));
    };
    useLayoutEffect(() => {
        initContacts.current.forEach((name, index) => {
            const name_ = name.toLowerCase();
            if (name_.includes(searchText.toLowerCase())) {
                amount.current++;
                groups.current[name_.charAt(0).toUpperCase()].push(
                    <User
                        key={index}
                        name={name_}
                        onClick={() => {
                            if (window.innerWidth <= 1200) {
                                toggleDrawer();
                                window.dispatchEvent(new CustomEvent("openinforblock", { detail: { username: name } }));
                            } else handleShowInfoBlock(name);
                        }}
                    />
                );
            }
        });
        setData([]);
    }, [searchText]);
    const renderByGroup = () => {
        const res = [];
        for (const i of groupLetters.current) {
            if (groups.current[i].length !== 0) {
                res.push(
                    <div key={i}>
                        <div className="bg-color px-8 py-1">{i}</div>
                        {groups.current[i].map((elem) => elem)}
                    </div>
                );
            }
        }
        return res;
    };
    return (
        <div className="bg-white flex h-full overflow-hidden">
            <div className="grow flex flex-col h-full overflow-hidden">
                <div className="p-8 border-b border-solid bg-white">
                    <div>
                        <div className="font-extrabold leading-8 font-s32">Contacts</div>
                        <div className="text-sm">{amount.current} contacts</div>
                    </div>
                    <div className="flex mt-6">
                        <label className="grow mr-4" htmlFor="searchBar">
                            <div className="rounded-3xl border border-solid px-4 flex items-center" css={searchBarCSS}>
                                <SearchIcon className="font-s20 opacity-70" />
                                <InputBase
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                                    value={searchText}
                                    placeholder="Search contacts"
                                    className="py-1 px-4 text-sm"
                                    id="searchBar"
                                />
                            </div>
                        </label>
                        <CustomBtn className="bg-darkPurple" css={addBtnCSS}>
                            <AddOutlinedIcon className="font-s20" />
                            <span className="ml-2">Add</span>
                        </CustomBtn>
                    </div>
                </div>
                <div className="grow overflow-auto">
                    <div>{renderByGroup()}</div>
                </div>
            </div>
            <div
                css={css`
                    @media (max-width: 1200px) {
                        display: none;
                    }
                `}
            >
                <UserInfoBlock />
            </div>
            <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                <Box
                    sx={{
                        width: 640,
                        backgroundColor: "#f1f5f9",
                        overflowX: "hidden",
                        minHeight: "100vh",
                    }}
                    role="presentation"
                >
                    <UserInfoBlock onToggle={toggleDrawer} />
                </Box>
            </Drawer>
        </div>
    );
}

export default Contacts;
