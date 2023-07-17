/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { useState, ChangeEvent, useRef, Fragment, useEffect, useMemo } from "react";
import { friend } from "~/types";
import AvatarState from "~/components/AvatarState";
import createId from "~/components/generateID";
import friends from "~/components/friends.json";
import ChatRoom from "./ChatRoom";
import {
    avatar0,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
} from "~/assets/imgs/avatars";
import ProfileDrawer from "./ProfileDrawer";

const headerCSS = css`
    background-color: rgb(246, 249, 251);
`;
const searchBarCSS = css`
    min-width: 44px;
`;
const leftCSS = css`
    width: 400px;
`;

function generateFriends(amount: number, sign: string): friend[] {
    const id = createId();
    const avatars = [
        avatar0,
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5,
        avatar6,
        avatar7,
        avatar8,
        avatar9,
        avatar10,
        avatar11,
        "",
        "",
        "",
    ];
    const states: ["on", "off", "pending"] = ["on", "off", "pending"];
    const res: friend[] = [];
    for (let i = 1; i <= amount; i++) {
        const state = states[Math.round(Math.random() * 2)];
        const avatar = avatars[Math.round(Math.random() * (avatars.length - 1))];
        const name = friends[Math.round(Math.random() * 79)];
        res.push({
            id: `${id()}${sign}`,
            avatar,
            state,
            chat: [
                { 1: ["Hi!"] },
                { 0: ["Hey, dude!", "Long time no see."] },
                { 1: ["Yeah, man... Things were quite busy for me and my family."] },
                { 0: ["What's up? Anything I can help with?"] },
                { 1: ["We've been on the move, changed 3 places over 4 months"] },
                { 0: ["Wow! That's crazy! 🤯 What happened?"] },
                {
                    1: [
                        "You know I got a job in that big software company. First move was because of that.",
                        "Then they decided to re-locate me after a month",
                        "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                        "So we moved the second time.",
                    ],
                },
                { 0: ["It's crazy!"] },
                {
                    1: [
                        "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                        "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                    ],
                },
                {
                    0: [
                        "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                        "😕",
                    ],
                },
                { 1: ["Thanks, man! It was good catching up with you."] },
                { 0: ["Yeah dude. Hit me again next week so we can grab a coffee, remotely!"] },
                { 1: [":) Sure, man! See you next week!"] },
                { 0: ["See you later."] },
                {
                    1: [
                        ":) Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course",
                    ],
                },
                { 0: ["👍🏻"] },
            ],
            name,
        });
    }
    return res;
}

interface FriendChatRoomProp {
    avatar: string;
    state: "on" | "off" | "pending";
    name: string;
    unread?: boolean;
    text?: string;
    onClick?: () => void;
    id: string | number;
}
function FriendChatRoom({ id, avatar, state, name, unread, text, onClick }: FriendChatRoomProp) {
    const shortMsgCSS = css`
        max-width: 160px;
    `;
    const target = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handler = (e: CustomEventInit<friend>) => {
            try {
                if (e.detail?.id === id) target.current!.innerText = e.detail.chat.at(-1)[1].at(-1);
            } catch (err) {
                console.log(err);
            }
        };
        window.addEventListener("chat/sended", handler);
        return () => window.removeEventListener("chat/sended", handler);
    }, []);
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between px-8 py-3 transition-colors hover:bg-gray-100 cursor-pointer"
        >
            <div className="flex items-center">
                <AvatarState state={state} alt="photo" src={avatar} />
                <div className="ml-4 my-1.5 overflow-hidden">
                    <div className="text-sm font-medium whitespace-nowrap">{name}</div>
                    <div
                        ref={target}
                        className="text-sm opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        css={shortMsgCSS}
                    >
                        {text || "See you tomorrow!❤️"}
                    </div>
                </div>
            </div>
            <div>
                <div className="text-sm opacity-70 font-s13 whitespace-nowrap">Jan 5, 2022</div>
                {unread && (
                    <div className="float-right bg-darkPurple rounded-full mt-1 text-xs flex items-center justify-center text-white w-5 h-5">
                        2
                    </div>
                )}
            </div>
        </div>
    );
}

function Chat() {
    const [searchText, setSearchText] = useState("");
    const [, forceUpdate] = useState({});
    const recently = useRef(generateFriends(5, "@"));
    const others = useRef(generateFriends(30, "_"));
    const recently_ = useRef<friend[]>(recently.current);
    const others_ = useRef<friend[]>(others.current);
    const [active, setActive] = useState<string | number>("");
    useEffect(() => {
        const handler = (e: CustomEventInit<friend>) => {
            if (
                !recently_.current.reduce((init, elem) => {
                    return init || elem.id === e.detail!.id;
                }, false)
            ) {
                recently_.current.unshift(e.detail!);
            } else {
                recently_.current = recently_.current.filter((elem) => elem.id !== e.detail!.id);
                recently_.current.unshift(e.detail!);
            }
            forceUpdate({});
        };
        window.addEventListener("chat/sended", handler);
        return () => window.removeEventListener("chat/sended", handler);
    }, []);
    useMemo(() => {
        if (searchText) {
            recently_.current = recently.current.filter((elem) => elem.name.includes(searchText.toLowerCase()));
            others_.current = others.current.filter((elem) => elem.name.includes(searchText.toLowerCase()));
        } else {
            recently_.current = recently.current;
            others_.current = others_.current = others.current;
        }
    }, [searchText]);
    const handleOpenChatRoom = (target: friend) => {
        window.dispatchEvent(new CustomEvent("chat/openChatRoom", { detail: target }));
    };
    return (
        <div className="bg-color h-full flex w-full relative temp">
            <div className="h-full flex flex-col overflow-hidden shrink-0" css={leftCSS}>
                <div className="px-8 py-4 border border-solid" css={headerCSS}>
                    <ProfileDrawer />
                    <label htmlFor="searchFriend">
                        <div
                            className="rounded-3xl border bg-white b order-solid px-4 flex items-center"
                            css={searchBarCSS}
                        >
                            <SearchIcon className="font-s20 opacity-70" />
                            <InputBase
                                id="searchFriend"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                                value={searchText}
                                placeholder="Search or start new chat"
                                className="py-1 px-4 text-sm"
                            />
                        </div>
                    </label>
                </div>
                <div className="border-r border-solid bg-white overflow-auto grow">
                    {!!recently_.current.length && (
                        <h2 className="text-xl text-darkPurple py-6 px-8 font-medium">Chats</h2>
                    )}
                    {recently_.current.map((one) => (
                        <Fragment key={one.id}>
                            <div className={`relative ${active === one.id ? "bg-gray-100" : ""}`}>
                                <div
                                    className="absolute left-0 h-full top-0 bg-slate-700"
                                    css={
                                        active === one.id
                                            ? css`
                                                  width: 4px;
                                              `
                                            : ""
                                    }
                                ></div>
                                <FriendChatRoom
                                    id={one.id}
                                    unread={one.id === "2@" || one.id === "5@"}
                                    name={one.name}
                                    avatar={one.avatar}
                                    state={one.state}
                                    onClick={() => {
                                        handleOpenChatRoom(one), setActive(one.id);
                                    }}
                                />
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                    {!!others_.current.length && (
                        <h2 className="text-xl text-darkPurple py-6 px-8 font-medium">Contacts</h2>
                    )}
                    {others_.current.map((one) => (
                        <Fragment key={one.id}>
                            <div className={`relative ${active === one.id ? "bg-gray-100" : ""}`}>
                                <div
                                    className="absolute left-0 h-full top-0 bg-slate-700"
                                    css={
                                        active === one.id
                                            ? css`
                                                  width: 4px;
                                              `
                                            : ""
                                    }
                                ></div>
                                <FriendChatRoom
                                    id={one.id}
                                    text="Hello developer😊"
                                    name={one.name}
                                    avatar={one.avatar}
                                    state={one.state}
                                    onClick={() => {
                                        handleOpenChatRoom(one), setActive(one.id);
                                    }}
                                />
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>
            </div>
            <ChatRoom />
        </div>
    );
}

export default Chat;
