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
import { useState, useRef, useMemo, memo, useEffect } from "react";
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

function FriendsList() {
    const [open, setOpen] = useState<number>(0);
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
        const states = ["on", "off", "pending"];
        const RandomFriend = (from: number, to: number) => {
            const res: friend[] = [];
            for (let i = from; i <= to; i++) {
                const state = states[Math.round(Math.random() * 2)];
                const avatar = avatars[Math.round(Math.random() * (avatars.length - 1))];
                res.push({ id: i, avatar, state, chat: [], name: "A Friend" });
            }
            return res;
        };
        recentlyContacts.current = RandomFriend(1, 5);
        otherContacts.current = RandomFriend(6, 32);
    }, []);
    const handleStartChat = (id: number) => {
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
                <Tooltip title="A Friend" placement="left" arrow>
                    <button className="py-1 px-2">
                        <AvatarState src={elem.avatar} sizes="small" alt="avatar" state={elem.state} />
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
const FriendsList_ = memo(FriendsList);
export default FriendsList_;
