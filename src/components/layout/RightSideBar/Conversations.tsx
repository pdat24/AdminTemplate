/** @jsxImportSource @emotion/react */
import { css, Fab } from "@mui/material";
import { forwardRef, ForwardedRef, useRef, useState, useEffect, useCallback, ReactElement } from "react";
import SendingTime from "~/components/SendingTime";
import SingleMsg from "~/components/ChatMessage";
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
    const [, setMsgs] = useState<chat>(friend ? friend.chat : []);
    const chatWrapper = useRef<HTMLDivElement>(null);
    const chatDefault = useRef(true);
    const msgInp = useRef<HTMLInputElement>(null);
    const sendBtn = useRef<HTMLButtonElement>(null);
    const id = useCallback(createId(), []);
    const created = useRef(false);

    if (!friend) chatDefault.current = true;
    else if (friend.chat.length === 0) chatDefault.current = true;
    else chatDefault.current = false;
    const handler = () => {
        setTimeout(() => {
            if (chatWrapper.current) chatWrapper.current.scrollTo(0, chatWrapper.current.scrollHeight);
        }, 225);
    };
    useEffect(() => {
        handler();
        window.addEventListener("addrecentcontact", handler);
        window.addEventListener("startchat", () => {
            created.current = false;
            handler();
        });
    }, []);
    useEffect(() => {
        if (sendBtn.current) {
            // send message
            const handleSendMsg = () => {
                if (msgInp.current!.value) {
                    chatDefault.current = false;
                    // dispatch e to change recently contact friends list in sidebar
                    if (msgInp.current!.value.replace(/\s/g, "").length) {
                        if (!created.current) {
                            friend?.chat.push({ 1: [msgInp.current!.value] });
                            created.current = true;
                        } else friend?.chat!.at(-1)[1].push(msgInp.current!.value);
                        window.dispatchEvent(
                            new CustomEvent("addrecentcontact", {
                                detail: friend,
                            })
                        );
                        setMsgs([...friend!.chat]);
                        msgInp.current!.value = "";
                    }
                }
            };
            // mount event
            sendBtn.current.onclick = handleSendMsg;
            msgInp.current!.onkeydown = (e: KeyboardEvent) => {
                if (e.key === "Enter") handleSendMsg();
            };
        }
    }, [friend]);
    const renderMsgs = (data: chat) =>
        !!data.length &&
        data.map((elems: bunchChat) => {
            const result: ReactElement[] = [];
            if (elems[0]) {
                elems[0].forEach((elem, index) => {
                    result.push(
                        <SingleMsg key={id()} type="you">
                            {elem}
                        </SingleMsg>
                    );
                    if (index === elems[0]!.length - 1) {
                        result.push(<SendingTime side="left" />);
                    }
                });
            } else if (elems[1]) {
                elems[1].forEach((elem, index) => {
                    result.push(
                        <SingleMsg key={id()} type="i">
                            {elem}
                        </SingleMsg>
                    );
                    if (index === elems[1]!.length - 1) {
                        result.push(<SendingTime side="right" />);
                    }
                });
            }
            return <div key={id()}>{...result}</div>;
        });
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
                                <div className="px-2">{renderMsgs(friend.chat)}</div>
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
