/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MoveToFolderBtn from "./MoveToFolderBtn";
import { Divider, Tooltip, Checkbox, Fab } from "@mui/material";
import { resetFab } from "~/components/CSS";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { colorDanger, colorWarn } from "~/components/colors";
import { useRef, ChangeEvent, useEffect, useState, useMemo } from "react";
import { msgType, typeMarked } from "../types";
import { useContext } from "react";
import { Context } from "../context";
import AddLabel from "./AddLabel";
import DropdownSelect from "./DropdownSelect";

const actionBtns = css`
    ${resetFab}
    width: auto;
    height: auto;
`;
const m8 = css`
    margin: 8px;
`;
const h56 = css`
    height: 56px;
`;
const checkbox = css`
    svg {
        font-size: 20px;
    }
`;
const starFab = css`
    ${actionBtns}
    width: 40px;
    height: 40px;
`;
const star = css`
    ${colorWarn}
    font-size: 28px;
`;

export default function ActionBtnGroup() {
    const [msgs, setMsgs] = useContext(Context);
    const msgsCopy = useRef<number>(msgs.length);
    const checkedList = useRef<msgType[]>([]);
    msgsCopy.current = useMemo(() => msgs.length, [msgs]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [, forceUpdate] = useState({});
    useEffect(() => {
        const hanlder = (e: CustomEventInit<{ targetId: string | number; checked: boolean }>) => {
            if (e.detail?.checked) {
                checkedList.current.push(msgs.filter((msg) => msg.id === e.detail!.targetId)[0]);
                if (checkedList.current.length === msgsCopy.current) {
                    setCheckedAll(true);
                } else forceUpdate({});
            } else {
                checkedList.current = checkedList.current.filter((msg) => msg.id !== e.detail!.targetId);
                setCheckedAll(false);
                forceUpdate({});
            }
        };
        window.addEventListener("mail/clickCheckbox", hanlder);
        return () => window.removeEventListener("mail/clickCheckbox", hanlder);
    }, [msgs]);
    const handleToggleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            checkedList.current = msgs;
            window.dispatchEvent(new CustomEvent("mail/checkAll"));
            setCheckedAll(true);
        } else {
            checkedList.current = [];
            window.dispatchEvent(new CustomEvent("mail/uncheckAll"));
            setCheckedAll(false);
        }
    };
    const handleDelete = () => {
        const newMsgs = msgs.filter((msg) => {
            if (checkedList.current.includes(msg)) {
                msg.type = "trash";
                return false;
            }
            return true;
        });
        setMsgs instanceof Function && setMsgs(newMsgs);
        checkedList.current = [];
        setCheckedAll(false);
    };
    const handleSetMarked = (type: typeMarked) => {
        msgs.forEach((msg) => {
            if (checkedList.current.includes(msg)) msg[type] = true;
        });
        setMsgs instanceof Function && setMsgs([...msgs]);
        setCheckedAll(false);
    };
    return (
        <div css={h56} className="p-3 flex items-center justify-start border-b border-solid">
            <div className="flex items-center">
                <Checkbox css={checkbox} onChange={handleToggleCheckAll} checked={checkedAll} />
                <DropdownSelect />
            </div>
            <Divider orientation="vertical" css={m8} />
            {!!checkedList.current.length && (
                <div className="flex items-center justify-start opacity-60">
                    <Tooltip placement="bottom" title="Delete">
                        <Fab css={actionBtns} onClick={handleDelete}>
                            <DeleteOutlineOutlinedIcon className="mx-2" />
                        </Fab>
                    </Tooltip>
                    <MoveToFolderBtn checkedList={checkedList.current} />
                    <Tooltip placement="bottom" title="Mark as unread">
                        <Fab css={actionBtns}>
                            <EmailOutlinedIcon className="mx-2" />
                        </Fab>
                    </Tooltip>
                    <AddLabel checkedList={checkedList.current} />
                    <Tooltip placement="bottom" title="Set important">
                        <Fab css={actionBtns} onClick={() => handleSetMarked("important")}>
                            <InfoOutlinedIcon css={colorDanger} className="mx-2" />
                        </Fab>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Set starred">
                        <Fab css={starFab} onClick={() => handleSetMarked("starred")}>
                            <StarOutlineRoundedIcon className="mx-2" css={star} />
                        </Fab>
                    </Tooltip>
                </div>
            )}
        </div>
    );
}
