/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Fab, Checkbox, InputBase, Tooltip } from "@mui/material";
import { resetFab } from "~/components/CSS";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import { Context } from "./NoteContext";
import BlockContainer from "~/components/BlockContainer";
import { useEffect, useRef, useContext, useState, MouseEvent, Dispatch, SetStateAction, KeyboardEvent } from "react";
import CustomBtn from "~/components/CustomButton";
import { labelsType, noteType } from "./colNotes";
const btn = css`
    ${resetFab}
    width: 40px;
    height: 40px;
`;
const w512 = css`
    width: 512px;
`;
const f14 = css`
    font-size: 14px;
`;
const inptTitle = css`
    font-weight: 700;
    height: 40px;
    font-size: 15px;
    input::placeholder {
        font-weight: 700;
    }
`;

export function AddLabelButton({
    value,
}: {
    value: [labels: labelsType[], setLabels: Dispatch<SetStateAction<labelsType[]>>];
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [labels, setLabels] = value;
    const open = Boolean(anchorEl);
    const labelsList: labelsType[] = ["friends", "personal", "priority", "tasks", "work", "family"];
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleToggleLabel = (label: labelsType) => {
        if (labels.includes(label)) setLabels(labels.filter((item) => item !== label));
        else
            setLabels((labels) => {
                labels.push(label);
                return [...labels];
            });
    };
    return (
        <>
            <Tooltip
                placement="bottom"
                title="Change label"
                css={css`
                    position: relative;
                    z-index: 3000;
                `}
            >
                <Fab css={btn} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                    <LocalOfferOutlinedIcon className="font-s20" />
                </Fab>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {labelsList.map((label) => (
                    <MenuItem key={label} onClick={() => handleToggleLabel(label)}>
                        <div className="flex items-center">
                            {labels.includes(label) ? (
                                <CheckCircleOutlineIcon className="font-s20" />
                            ) : (
                                <RemoveCircleOutlineIcon className="font-s20" />
                            )}
                            <span className="text-sm capitalize ml-2">{label}</span>
                        </div>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default function NoteCreator({ type }: { type: noteType }) {
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [labels, setLabels] = useState<labelsType[]>([]);
    const [items, setItems] = useState<{ completed: number; text: string }[]>([]);
    const [showItemEntry, setShowItemEntry] = useState(false);
    const [itemContent, setItemContent] = useState("");
    const pos = useRef(1);
    const setters = useContext(Context);
    const handleActive = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setActive(true);
    };
    const handleDisable = () => {
        setActive(false);
        setContent("");
        setTitle("");
        setShowItemEntry(false);
        setItems([]);
        setLabels([]);
    };
    const handleAddItem = () => {
        setItems((prev) => {
            prev.push({
                completed: 0,
                text: itemContent,
            });
            return [...prev];
        });
        setItemContent("");
    };
    const handleAddItemByKey = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === "Enter") handleAddItem();
    };
    const handleAddNote = (type: noteType) => {
        setters[pos.current - 1]((prev) => {
            prev.push({
                title,
                content,
                items,
                tags: labels,
                type: type,
            });
            return [...prev];
        });
        pos.current = pos.current < 4 ? pos.current + 1 : 1;
        handleDisable();
    };
    useEffect(() => {
        window.addEventListener("click", handleDisable);
        return () => window.removeEventListener("click", handleDisable);
    });
    return (
        <BlockContainer className="bg-white mt-2 mb-4 mx-auto" css_={w512}>
            {!active ? (
                <div className="py-3 px-4 cursor-pointer opacity-60" onClick={handleActive}>
                    Take a note...
                </div>
            ) : (
                <div className="opacity-80 px-5 py-4 text-sm" onClick={(e) => e.stopPropagation()}>
                    <InputBase
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        className="w-full"
                        placeholder="Title"
                        css={inptTitle}
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Take a note..."
                        className="outline-0 border-0 block my-4 resize-none w-full h64"
                    ></textarea>
                    <div>
                        {!!items.length && (
                            <ul className="mb-3">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-center -ml-2">
                                        <Checkbox
                                            checked={!!item.completed}
                                            onChange={() => {
                                                setItems(
                                                    items.map((item, i) => {
                                                        if (i === index) item.completed = item.completed ? 0 : 1;
                                                        return item;
                                                    })
                                                );
                                            }}
                                        />
                                        <div className="grow text-sm">{item.text}</div>
                                        <Fab
                                            css={btn}
                                            onClick={() => {
                                                setItems(items.filter((item, i) => i !== index));
                                            }}
                                        >
                                            <DeleteOutlineIcon />
                                        </Fab>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {showItemEntry && (
                            <div className="flex items-center mb-3">
                                <div>
                                    {!itemContent.length ? (
                                        <AddIcon className="font-s20 opacity-40" />
                                    ) : (
                                        <div onClick={handleAddItem}>
                                            <AddIcon className="font-s20 cursor-pointer opacity-80" />
                                        </div>
                                    )}
                                </div>
                                <InputBase
                                    onKeyDown={(e) => handleAddItemByKey(e)}
                                    value={itemContent}
                                    css={f14}
                                    onChange={(e) => setItemContent(e.target.value)}
                                    className="w-full ml-3 text-sm"
                                    placeholder="Add an item"
                                    autoFocus
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center opacity-60">
                            <Tooltip placement="bottom" title="Remind me">
                                <Fab css={btn} onClick={() => handleAddNote("reminder")}>
                                    <NotificationsActiveIcon className="font-s20" />
                                </Fab>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Add tasks">
                                <Fab css={btn} onClick={() => setShowItemEntry(true)}>
                                    <DriveFileRenameOutlineOutlinedIcon className="font-s20" />
                                </Fab>
                            </Tooltip>
                            <AddLabelButton value={[labels, setLabels]} />
                            <Tooltip placement="bottom" title="Archive">
                                <Fab css={btn} onClick={() => handleAddNote("archive")}>
                                    <Inventory2OutlinedIcon className="font-s20" />
                                </Fab>
                            </Tooltip>
                        </div>
                        <div
                            onClick={() => {
                                handleAddNote(type);
                                handleDisable();
                            }}
                        >
                            <CustomBtn>
                                <span className="font-medium">Create</span>
                            </CustomBtn>
                        </div>
                    </div>
                </div>
            )}
        </BlockContainer>
    );
}
