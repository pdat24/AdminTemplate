/** @jsxImportSource @emotion/react */
import { css, Fab, Chip } from "@mui/material";
import { forwardRef, ForwardedRef, useRef, useState, useEffect, ReactNode, useCallback } from "react";
// icons
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ForumIcon from "@mui/icons-material/Forum";
import { friend, type chat, bunchChat } from "~/types";
import createId from "~/components/generateID";
const wrapperCSS = css`
    background-color: rgb(241, 245, 249);
    padding-bottom: 70px;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    height: calc(100vh - 68px);
`;
const textGray = css`
    color: rgb(107, 114, 128);
`;
const font100 = css`
    font-size: 100px;
`;
const h70 = css`
    height: 70px;
`;
const shadowInpDiv = css`
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;
const sendBtnCSS = css`
    background-color: transparent;
    box-shadow: none !important;
`;
const msgMeCSS = css`
    background-color: rgb(100, 116, 139);
    color: #fff;
    padding: 10px 8px;
    height: auto;
    font-size: 14px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`;
const msgFriendCSS = css`
    ${msgMeCSS}
    background-color: rgb(129, 140, 248);
    border-radius: 20px;
`;

const chatWrapperCSS = css`
    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #bbb;
        border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #aaa;
    }
`;

function Conversation({ friend }: { friend: friend | null }, ref: ForwardedRef<HTMLDivElement>) {
    const [msgs, setMsgs] = useState<chat>(friend ? friend.chat : []);
    const chatWrapper = useRef<HTMLDivElement>(null);
    const chatDefault = useRef(true);
    const msgInp = useRef<HTMLInputElement>(null);
    const sendBtn = useRef<HTMLButtonElement>(null);
    const id = useCallback(createId(), []);

    if (!friend) chatDefault.current = true;
    else if (friend.chat.length === 0) chatDefault.current = true;
    else chatDefault.current = false;
    useEffect(() => {
        if (sendBtn.current) {
            // send message
            const handleSendMsg = () => {
                if (msgInp.current!.value) {
                    chatDefault.current = false;
                    // dispatch e to change recently contact friends list in sidebar
                    if (friend?.chat.length === 0)
                        window.dispatchEvent(
                            new CustomEvent("addrecentcontact", {
                                detail: friend,
                            })
                        );
                    // update chatroom
                    friend?.chat.push({ 1: [msgInp.current!.value] });
                    // response message
                    setTimeout(() => {
                        friend?.chat.push({
                            0: ["Your message is sent successfully.", "Thanks for seeing my project❤️!"],
                        });
                        setMsgs([...friend!.chat]);
                    }, 3000);
                    setMsgs([...friend!.chat]);
                    // reset msg in input field
                    msgInp.current!.value = "";
                }
            };
            // mount event
            sendBtn.current.onclick = handleSendMsg;
            msgInp.current!.onkeydown = (e: KeyboardEvent) => {
                if (e.key === "Enter") handleSendMsg();
            };
        }
    }, [friend]);
    // handle change message corner's border radius
    const handleStartEnd = (index: number) => {
        if (index === 0 && msgs.length > 1) {
            return {
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "4px",
            };
        } else if (index === msgs.length - 1 && msgs.length > 1)
            return {
                borderBottomRightRadius: "20px",
                borderTopRightRadius: "4px",
                // marginBottom: "20px",
            };
    };
    // handle render messages in chatroom
    const handleRenderMsgs = (data: chat) => {
        let result: ReactNode[] = [];
        data.forEach((msg: bunchChat, index) => {
            if (msg[1]) {
                const batch = msg[1].map((text) => {
                    return (
                        <div className="mb-1 pr-4 w-full text-right" key={index}>
                            <Chip label={text} css={msgMeCSS} style={(() => handleStartEnd(index))()} />
                        </div>
                    );
                });
                result = [...result, ...batch];
            } else if (msg[0]) {
                const batch = msg[0].map((text) => {
                    return (
                        <div className="mb-1 pl-4 w-full text-left" key={id()}>
                            <Chip label={text} css={msgFriendCSS} />
                        </div>
                    );
                });
                result = [...result, ...batch];
            }
        });
        return result;
    };
    // return
    return (
        <>
            {friend ? (
                <div className="relative grow" ref={ref} css={wrapperCSS}>
                    <div className="pt-4 h-full">
                        <div ref={chatWrapper} css={chatWrapperCSS} className="h-full overflow-auto">
                            {chatDefault.current ? (
                                <div className="flex flex-col justify-center items-center p-6 h-full" css={textGray}>
                                    <TextsmsOutlinedIcon className="grow" css={font100} />
                                    <div className="text-sm text-center">
                                        Start a conversation by typing your message below.
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-end">{handleRenderMsgs(friend.chat)}</div>
                            )}
                        </div>
                    </div>
                    <div className="absolute bottom-0 px-2 pb-4 w-full" css={h70}>
                        <div className="flex relative rounded-3xl bg-white" css={shadowInpDiv}>
                            <input
                                autoFocus
                                ref={msgInp}
                                type="text"
                                className="py-1 text-sm outline-0 border-0 grow my-3 ml-3 mr-20"
                                placeholder="Type your message"
                            />
                            <div className="absolute h-full flex items-center right-1">
                                <Fab size="small" css={sendBtnCSS} ref={sendBtn}>
                                    <SendRoundedIcon css={textGray} />
                                </Fab>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grow p-6" ref={ref}>
                    <div
                        className="h-full flex flex-col items-center justify-center"
                        css={css`
                            color: rgb(107, 114, 128);
                        `}
                    >
                        <ForumIcon style={{ fontSize: "100px" }} />
                        <div className="text-sm px-4 mt-6 text-center">Select a contact to start a conversation.</div>
                    </div>
                </div>
            )}
        </>
    );
}

const Conversation_ = forwardRef(Conversation);
export default Conversation_;
