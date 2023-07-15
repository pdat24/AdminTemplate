/** @jsxImportSource @emotion/react */
import { css, Tooltip } from "@mui/material";
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
import AvatarState from "../../AvatarState";
import { useState, useRef, useMemo, useEffect } from "react";
import { type friend } from "~/types";

const avatarDiv = css`
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
        background-color: rgba(17, 24, 39, 0.04);
    }
`;
const bodyLeftCSS = css`
    width: 70px;
    height: calc(100vh - 64px);
    ::-webkit-scrollbar {
        display: none;
    }
`;

export default function FriendsList() {
    const [open, setOpen] = useState<number | string>(0);
    const [, forceUpdate] = useState({});
    const recentlyContacts = useRef<Array<friend>>([]);
    const otherContacts = useRef<Array<friend>>([]);
    useEffect(() => {
        window.addEventListener("startchat", (e: CustomEventInit) => {
            if (!e.detail) setOpen(0);
        });
        window.addEventListener("addrecentcontact", (e: CustomEventInit<friend>) => {
            if (!recentlyContacts.current.includes(e.detail!)) {
                recentlyContacts.current.unshift(e.detail!);
                otherContacts.current = otherContacts.current.filter((elem) => elem.id !== e.detail!.id);
            } else {
                recentlyContacts.current = recentlyContacts.current.filter((elem) => elem.id !== e.detail!.id);
                recentlyContacts.current.unshift(e.detail!);
            }
            forceUpdate({});
        });
    }, []);
    useMemo(() => {
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
        const RandomFriend = (from: number, to: number) => {
            const res: friend[] = [];
            for (let i = from; i <= to; i++) {
                const state = states[Math.round(Math.random() * 2)];
                const avatar = avatars[Math.round(Math.random() * (avatars.length - 1))];
                res.push({
                    id: i,
                    avatar,
                    state,
                    chat: [
                        { "1": ["Hi!"] },
                        { "0": ["Hey, dude!", "Long time no see."] },
                        { "1": ["Yeah, man... Things were quite busy for me and my family."] },
                        { "0": ["What's up? Anything I can help with?"] },
                        { "1": ["We've been on the move, changed 3 places over 4 months"] },
                        { "0": ["Wow! That's crazy! 🤯 What happened?"] },
                        {
                            "1": [
                                "You know I got a job in that big software company. First move was because of that.",
                                "Then they decided to re-locate me after a month",
                                "Which was an absolute pain because we just set up everything, house, kids school and all that.",
                                "So we moved the second time.",
                            ],
                        },
                        { "0": ["It's crazy!"] },
                        {
                            "1": [
                                "Then this virus thing happened and just after a week we moved in, they decided the whole department will be working remotely.",
                                "And then we decided to move back our first location because, you know, everything was already setup so that's the third time.",
                            ],
                        },
                        {
                            "0": [
                                "Ohh dude, I'm really sorry you had to go through all that in such a short period of time",
                                "😕",
                            ],
                        },
                        { "1": ["Thanks, man! It was good catching up with you."] },
                        { "0": ["Yeah dude. Hit me again next week so we can grab a coffee, remotely!"] },
                        { "1": [":) Sure, man! See you next week!"] },
                        { "0": ["See you later."] },
                        {
                            "1": [
                                ":) Hey! Are you available right now? How about if we grab that coffee today? Remotely, of course",
                            ],
                        },
                        { "0": ["👍🏻"] },
                    ],
                    name: "A Friend",
                });
            }
            return res;
        };
        recentlyContacts.current = RandomFriend(1, 5);
        otherContacts.current = RandomFriend(6, 32);
    }, []);
    const handleStartChat = (id: number | string) => {
        setOpen(id);
        const target = [...recentlyContacts.current, ...otherContacts.current].filter((elem) => elem.id === id)[0];
        window.dispatchEvent(new CustomEvent("startchat", { detail: target }));
    };
    const RendeFriends = (list: friend[]) => {
        return list.map((elem) => (
            <div
                key={elem.id}
                className="w-full flex justify-center"
                style={
                    open === elem.id
                        ? {
                              borderRight: "4px solid #ddd",
                              borderRadius: "4px",
                          }
                        : {}
                }
                onClick={() => handleStartChat(elem.id)}
                css={avatarDiv}
            >
                <Tooltip title="A Friend" placement="left">
                    <button className="py-1 px-2">
                        <AvatarState src={elem.avatar} alt="avatar" state={elem.state} />
                    </button>
                </Tooltip>
            </div>
        ));
    };
    return (
        <div css={bodyLeftCSS} className="grow-1 overflow-y-auto shrink-0">
            <div className="block py-2 text-center">
                {RendeFriends(recentlyContacts.current)}
                <hr
                    className="my-2 mx-auto"
                    css={css`
                        width: 22px;
                    `}
                />
                {RendeFriends(otherContacts.current)}
            </div>
        </div>
    );
}
