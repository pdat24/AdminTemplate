/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import createId from "~/components/generateID";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import CustomBtn from "~/components/CustomButton";
import SingleMsg from "~/components/ChatMessage";
import AvatarState from "~/components/AvatarState";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Fab } from "@mui/material";
import { resetFab } from "~/components/CSS";
import {
    useEffect,
    useState,
    useCallback,
    ReactElement,
    ChangeEvent,
    KeyboardEvent,
    Dispatch,
    SetStateAction,
    useRef,
} from "react";

import { bunchChat, chat, friend } from "~/types";
import NoSelectedChat from "~/components/NoSelectedChat";
import ContactInfo from "./ContactInfo";
const shadowInpDiv = css`
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;
const morvertBtn = css`
    ${resetFab}
    width: 40px;
    height: 40px;
`;

function Messages({ data }: { data: chat }) {
    const id = useCallback(createId(), []);
    const wrapperDOM = useRef<HTMLDivElement>(null);
    const SendingTime = ({ side }: { side: "left" | "right" }) => (
        <p key={id()} className={`text-${side} text-xs opacity-50 mb-5 mx-3.5`}>
            over 1 seconds ago
        </p>
    );
    const handler = () => {
        setTimeout(() => {
            wrapperDOM.current!.scrollTo(0, wrapperDOM.current!.scrollHeight);
        }, 100);
    };
    useEffect(handler, []);
    useEffect(() => {
        window.addEventListener("chat/sended", handler);
        window.addEventListener("chat/openChatRoom", handler);
        return () => {
            window.removeEventListener("chat/sended", handler);
            window.removeEventListener("chat/openChatRoom", handler);
        };
    }, []);
    return (
        <div ref={wrapperDOM} className="p-4 pb-10 pl-6 overflow-scroll">
            {!!data.length &&
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
                })}
        </div>
    );
}

function EntryMsg({ onSendMessage }: { onSendMessage: Dispatch<SetStateAction<friend | undefined>> }) {
    const [msg, setMsg] = useState("");
    const created = useRef(false);
    useEffect(() => {
        window.addEventListener("chat/openChatRoom", () => (created.current = false));
    }, []);
    const handleSend = () => {
        if (msg.replace(/\s/g, "").length) {
            let chatRoom;
            onSendMessage((prev) => {
                if (!created.current) {
                    prev?.chat.push({ 1: [msg] });
                    created.current = true;
                } else prev?.chat.at(-1)[1].push(msg);
                chatRoom = prev;
                return { ...prev };
            });
            window.dispatchEvent(new CustomEvent("chat/sended", { detail: chatRoom }));
            setMsg("");
        }
    };
    const handleSendByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };
    return (
        <div className="bg-milk absolute bottom-0 w-full">
            <div className="p-4 border border-solid flex items-center">
                <CustomBtn>
                    <SentimentSatisfiedOutlinedIcon />
                </CustomBtn>
                <CustomBtn>
                    <AttachFileOutlinedIcon />
                </CustomBtn>
                <div className="border border-solid mx-2 grow flex rounded-3xl bg-white" css={shadowInpDiv}>
                    <input
                        value={msg}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)}
                        onKeyDown={handleSendByEnter}
                        autoFocus
                        type="text"
                        className="text-sm px-2 outline-0 border-0 grow my-3 mx-4"
                        placeholder="Type your message"
                    />
                </div>
                <div className="h-full flex items-center right-1" onClick={handleSend}>
                    <CustomBtn>
                        <SendRoundedIcon className="opacity-50" />
                    </CustomBtn>
                </div>
            </div>
        </div>
    );
}

function ChatRoom() {
    const [data, setData] = useState<friend>();
    useEffect(() => {
        window.addEventListener("chat/openChatRoom", (e: CustomEventInit<friend>) => {
            setData(e.detail);
        });
    }, []);
    return (
        <div className="bg-color h-full grow">
            {data ? (
                <div className="flex h-full overflow-hidden ">
                    <div className="relative flex flex-col h-full overflow-hidden pb-8 shrink">
                        <div className="h-16 w-full bg-milk border border-solid flex items-center shrink-0">
                            <div className="flex items-center justify-between px-4 w-full">
                                <div
                                    onClick={() => window.dispatchEvent(new CustomEvent("chatroom/openrightside"))}
                                    className="cursor-pointer flex items-center ml-2"
                                >
                                    <AvatarState state={data.state} alt="photo" src={data?.avatar} />
                                    <div className="ml-4 text-black font-medium">{data?.name}</div>
                                </div>
                                <Fab css={morvertBtn}>
                                    <MoreVertOutlinedIcon />
                                </Fab>
                            </div>
                        </div>
                        <Messages data={data.chat} />
                        <EntryMsg onSendMessage={setData} />
                    </div>
                    <ContactInfo data={data} />
                </div>
            ) : (
                <NoSelectedChat text="Select a conversation or start a new chat." />
            )}
        </div>
    );
}

export default ChatRoom;
