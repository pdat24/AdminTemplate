/**@jsxImportSource @emotion/react */
import SearchIcon from "@mui/icons-material/Search";
import { css } from "@emotion/react";
import { InputBase, Checkbox, Avatar } from "@mui/material";
import { colorWarn, colorDanger } from "~/components/colors";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import friends from "~/components/friends.json";
import { useRef, ChangeEvent, useEffect, useState, useMemo } from "react";
import { typeValids, tagsType, msgType, typeMessage, selectedTypes } from "./types";
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
import createId from "~/components/generateID";
import ActionBtnGroup from "./ActionBtnGroup";
import MailContext from "./context";
import MailContent from "./MailContent";
import contents from "./contents";

const searchBarCSS = css`
    min-width: 44px;
`;
const checkbox = css`
    svg {
        font-size: 20px;
    }
`;
const f200 = css`
    font-size: 100px;
`;
const checkboxOne = css`
    ${checkbox}
    background: transparent !important;
`;

const msgDiv = css`
    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`;
const fontS14 = css`
    font-size: 14px;
`;
const limitText = css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const validTags: tagsType = ["personal", "work", "payments", "accounts", "forums", "invoices"];

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

const AMOUNT_MSGS = 50;

interface MessageProps {
    avatar?: string;
    name: string;
    id: string | number;
    title: string;
    content: string;
    starred?: boolean;
    important?: boolean;
    tags?: string[];
    onActive?: () => void;
}

function Message({ onActive, important, avatar, name, title, content, starred, id, tags }: MessageProps) {
    const [checked, setChecked] = useState(false);
    const handleClickCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (e.target.checked) setChecked(true);
        else setChecked(false);
        window.dispatchEvent(
            new CustomEvent("mail/clickCheckbox", {
                detail: {
                    checked: e.target.checked,
                    targetId: id,
                },
            })
        );
    };
    useEffect(() => {
        const check = () => setChecked(true);
        const uncheck = () => setChecked(false);
        const checkByEvent = (type: selectedTypes) => {
            switch (type) {
                case "starred":
                    starred && setChecked(true);
                    break;
                case "unStarred":
                    !starred && setChecked(true);
                    break;
                case "important":
                    important && setChecked(true);
                    break;
                case "unImportant":
                    !important && setChecked(true);
                    break;
            }
        };
        const checkStarred = () => checkByEvent("starred");
        const checkUntarred = () => checkByEvent("unStarred");
        const checkImportant = () => checkByEvent("important");
        const checkUnmportant = () => checkByEvent("unImportant");
        window.addEventListener("mail/uncheckAll", uncheck);
        window.addEventListener("mail/checkAll", check);
        window.addEventListener("mail/checkStarred", checkStarred);
        window.addEventListener("mail/checkUnstarred", checkUntarred);
        window.addEventListener("mail/checkImportant", checkImportant);
        window.addEventListener("mail/checkUnimportant", checkUnmportant);
        return () => {
            window.removeEventListener("mail/checkAll", check);
            window.removeEventListener("mail/uncheckAll", uncheck);
            window.removeEventListener("mail/checkStarred", checkStarred);
            window.removeEventListener("mail/checkUnstarred", checkUntarred);
            window.removeEventListener("mail/checkImportant", checkImportant);
            window.removeEventListener("mail/checkUnimportant", checkUnmportant);
        };
    }, [important, starred]);
    const handleOpenMessage = () => {
        window.dispatchEvent(
            new CustomEvent("mail/openMessage", {
                detail: {
                    id,
                    name,
                    content,
                    avatar,
                    title,
                    important,
                    starred,
                    tags,
                },
            })
        );
        onActive && onActive();
    };
    return (
        <div
            onClick={handleOpenMessage}
            className="flex py-5 pl-3 pr-2 w-full overflow-hidden border-b border-solid cursor-pointer transition-colors"
            css={msgDiv}
        >
            <div onClick={(e) => e.stopPropagation()} className="h-fit">
                <Checkbox css={checkboxOne} checked={checked} onChange={handleClickCheckbox} />
            </div>
            <div className="opacity-80 w-full overflow-hidden">
                <div className="flex items-center">
                    <Avatar alt="photo" src={avatar} />
                    <div className="grow overflow-hidden ml-2">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="whitespace-nowrap mr-2 font-bold">{name}</div>
                                {important && <InfoRoundedIcon className="font-s16" css={colorDanger} />}
                            </div>
                            <div className="font-s13">Oct 8</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="frow whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
                            {starred && (
                                <div className="flex shrink-0 items-center">
                                    <AttachFileRoundedIcon className="font-s16" />
                                    <StarRateRoundedIcon className="font-s20" css={colorWarn} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div css={limitText} className="mt-2 opacity-70">
                    {content}
                </div>
            </div>
        </div>
    );
}

function generateMsgs(amount: number) {
    const id = createId();
    const titles = [
        "Delivery address confirmation",
        "Ipsum laborum minim aute labore in",
        "Nulla culpa consectetur aute ex eu irure incididunt aliqua cupidatat sit cillum fugiat anim ea",
        "Quote for a new web design project",
        "Previous clients and their invoices",
        "Minim do reprehenderit dolor ipsum officia magna laborum est anim in fugiat",
    ];
    const trueOrFalse = () => Math.random() < 0.5;
    const typesMsg: typeMessage[] = ["draft", "inbox", "spam", "trash", "sent"];
    const res: msgType[] = [];
    for (let i = 1; i <= amount; i++) {
        const name = friends[Math.round(Math.random() * 79)];
        const avatar = avatars[Math.round(Math.random() * 14)];
        const title = titles[Math.round(Math.random() * 5)];
        const type = typesMsg[Math.round(Math.random() * 4)];
        const content = contents[Math.round(Math.random()) * 3];
        res.push({
            id: `@${id()}`,
            name,
            avatar,
            title,
            content,
            type,
            starred: trueOrFalse(),
            important: trueOrFalse(),
            tags: validTags.filter(() => trueOrFalse()),
        });
    }
    return res;
}

function MailBanner({ type }: { type: typeValids }) {
    const initMsgs = useRef<msgType[]>(generateMsgs(AMOUNT_MSGS));
    const [searchText, setSearchText] = useState("");
    const [msgs, setMsgs] = useState<msgType[]>(initMsgs.current);
    const msgsForSearch = useRef(msgs);
    const [active, setActive] = useState<string | number>("");
    msgsForSearch.current = useMemo(() => msgs, [msgs]);
    useMemo(() => {
        if (searchText) {
            msgsForSearch.current = msgs.filter((elem) => elem.name.includes(searchText.toLowerCase()));
        } else {
            msgsForSearch.current = msgs;
        }
    }, [searchText]);
    useEffect(() => {
        let msgsList: msgType[];
        if (type === "starred") msgsList = initMsgs.current.filter((msg) => msg.starred);
        else if (type === "important") msgsList = initMsgs.current.filter((msg) => msg.important);
        else if (type instanceof Object) {
            msgsList = initMsgs.current.filter((msg) => {
                return type.tags.every((tag) => msg.tags.includes(tag));
            });
        } else msgsList = initMsgs.current.filter((msg) => msg.type === type);
        setMsgs(msgsList);
    }, [type]);
    const renderMessage = (msg: msgType) => (
        <div className="flex relative" key={msg.id}>
            <div
                className="absolute left-0 h-full top-0 bg-gray-400"
                css={
                    active === msg.id
                        ? css`
                              width: 4px;
                          `
                        : ""
                }
            ></div>
            <Message
                id={msg.id}
                starred={msg.starred}
                important={msg.important}
                avatar={msg.avatar}
                name={msg.name}
                title={msg.title}
                onActive={() => {
                    setActive(msg.id);
                    setSearchText("");
                }}
                tags={msg.tags}
                content={msg.content}
            />
        </div>
    );
    return (
        <div className="h-full grow flex">
            <MailContext value={[msgs, setMsgs]}>
                <div className="border border-solid bg-white h-full overflow-hidden w400 shrink-0">
                    <div className="h-full overflow-hidden flex flex-col">
                        <div className="shrink-0">
                            <div className="h64 bg-color border-b border-solid flex items-center p-3">
                                <div className="font-medium mr-4 text-sm">INBOX</div>
                                <label htmlFor="searchMail" className="grow">
                                    <div
                                        className="rounded-3xl border border-solid border-gray-400 opacity-80 px-4 flex items-center"
                                        css={searchBarCSS}
                                    >
                                        <SearchIcon className="font-s20 opacity-70" />
                                        <InputBase
                                            value={searchText}
                                            id="searchMail"
                                            onChange={(e) => setSearchText(e.target.value)}
                                            placeholder="Search for an e-mail or task"
                                            className="py-1 px-4 w-full"
                                            css={fontS14}
                                        />
                                    </div>
                                </label>
                            </div>
                            <ActionBtnGroup />
                        </div>
                        <div className="h-full overflow-auto text-sm">
                            {msgsForSearch.current.length ? (
                                msgsForSearch.current.map((msg) => renderMessage(msg))
                            ) : (
                                <div className="flex justify-center w-full h-full items-start bg-color">
                                    <div className="text-center opacity-40 my-8">
                                        <DraftsOutlinedIcon css={f200} />
                                        <div className="text-xl font-medium">There are no messages!</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MailContext>
            <MailContent />
        </div>
    );
}

export default MailBanner;
