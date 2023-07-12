/** @jsxImportSource @emotion/react */
import { css, Avatar } from "@mui/material";

// icons
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useRef } from "react";
import FriendsList from "./FriendsList";
import Conversation from "./Conversations";
import { type friend } from "~/types";

const wrapperCSS = css`
    position: fixed;
    right: 0;
    display: flex;
    top: 0;
    height: 100vh;
    z-index: 2000;
    overflow: hidden;
    flex-direction: column;
    width: 360px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    background-color: #fff;
    transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    margin-right: -290px;
`;
// animation: 1ms linear 0s 300 normal forwards running hide-panel;

const bodyCSS = css``;
const headerCSS = css`
    min-height: 64px;
    background-color: rgb(30, 41, 59);
    color: #fff;
`;
const closeBtn = css`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function RightSideBar() {
    const wrapperDOM = useRef<HTMLDivElement>(null);
    const bodyRightDOM = useRef<HTMLDivElement>(null)!;
    const [friend, setFriend] = useState<friend | null>();
    useEffect(() => {
        // prevent default on click
        wrapperDOM.current &&
            wrapperDOM.current.addEventListener("click", (e) => {
                e.preventDefault();
            });
        // close when click anywhere except wrapper
        document.body.addEventListener("click", (e: Event) => {
            if (!e.defaultPrevented) handleClose();
        });
        window.addEventListener("startchat", (e: CustomEventInit<friend>) => {
            e.detail && handleOpen();
            setFriend(e.detail);
        });
    }, []);
    // open right sidebar
    const handleOpen = () => {
        if (wrapperDOM.current) wrapperDOM.current.style.marginRight = "0";
    };
    // close right sidebar
    const handleClose = () => {
        if (bodyRightDOM.current && wrapperDOM.current) {
            wrapperDOM.current.style.marginRight = `-${parseFloat(
                window.getComputedStyle(bodyRightDOM.current).width
            )}px`;
            window.dispatchEvent(new CustomEvent("startchat", { detail: null }));
        }
    };
    return (
        <>
            <div css={wrapperCSS} ref={wrapperDOM}>
                {/** header */}
                <header css={headerCSS} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 px-3 text-lg">
                        {friend ? (
                            <div css={closeBtn}>
                                <Avatar src={friend.avatar} sizes="small" />
                            </div>
                        ) : (
                            <button css={closeBtn} onClick={handleOpen}>
                                <MarkUnreadChatAltIcon />
                            </button>
                        )}
                        <div>{friend ? friend.name : "Team Chat"}</div>
                    </div>
                    <button css={closeBtn} onClick={handleClose}>
                        <CloseIcon />
                    </button>
                </header>
                {/** conversation */}
                <div css={bodyCSS} className="flex grow">
                    <FriendsList />
                    <Conversation ref={bodyRightDOM} friend={friend!} />
                </div>
            </div>
            <div
                style={{
                    width: "70px",
                    height: "100vh",
                }}
            ></div>
        </>
    );
}

export default RightSideBar;
