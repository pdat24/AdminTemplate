/**@jsxImportSource @emotion/react */
import { useState, forwardRef, ReactElement, KeyboardEvent, Dispatch, SetStateAction } from "react";
import BlockContainer from "~/components/BlockContainer";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { css } from "@emotion/react";
import { Fab, Checkbox, InputBase, Tooltip, Chip } from "@mui/material";
import { resetFab } from "~/components/CSS";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CustomBtn from "~/components/CustomButton";
import { AddLabelButton } from "./NoteCreator";
import { colProp, labelsType } from "./colNotes";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const btn = css`
    ${resetFab}
    width: 40px;
    height: 40px;
`;
const f14 = css`
    font-size: 14px;
`;
const f15 = css`
    font-size: 15px;
`;
const f40 = css`
    font-size: 36px;
    line-height: 44px;
    overflow-wrap: break-word;
`;

const inptTitle = css`
    font-weight: 700;
    height: 40px;
    font-size: 15px;
    input::placeholder {
        font-weight: 700;
    }
`;
const dialogCSS = css`
    > div > div:first-of-type {
        border-radius: 16px;
    }
`;

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ANote({ note, onSetNote }: { note: colProp; onSetNote: Dispatch<SetStateAction<colProp[]>> }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [labels, setLabels] = useState<labelsType[]>(note.tags);
    const [items, setItems] = useState<{ completed: number; text: string }[]>(note.items);
    const [showItemEntry, setShowItemEntry] = useState(!!items.length);
    const [itemContent, setItemContent] = useState("");
    const handleSave = () => {
        onSetNote((prevNotes) => {
            prevNotes.map((prevNote) => {
                if (prevNote === note) {
                    prevNote.title = title;
                    prevNote.content = content;
                    prevNote.items = items;
                    prevNote.tags = labels;
                }
            });
            return [...prevNotes];
        });
        handleClose();
    };
    const handleDelete = () => {
        onSetNote((prevNotes) => {
            return prevNotes.filter((prevNote) => prevNote !== note);
        });
        handleClose();
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
    return (
        <div>
            <div onClick={handleClickOpen}>
                <BlockContainer className="bg-white px-5 py-4 text-sm mb-4 cursor-pointer">
                    {!!note.title && <h2 className="mb-4 text-xl font-medium">{note.title}</h2>}
                    <div
                        css={css`
                            ${!note.title ? f40 : f15}
                        `}
                        className="mb-4"
                    >
                        {note.content}
                    </div>
                    {!!note.items.length && (
                        <ul className="mb-4">
                            {note.items.map((item, i_2) => (
                                <li className="flex items-enter" key={i_2}>
                                    <CheckCircleOutlineIcon
                                        className="font-s20 opacity-60"
                                        css={css`
                                            color: ${item.completed ? "green" : "initial"};
                                        `}
                                    />
                                    <span
                                        className={`ml-2 overflow-hidden ${
                                            item.completed ? "line-through opacity-60" : ""
                                        }`}
                                    >
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {!!note.tags.length && (
                        <div className="flex flex-wrap">
                            {note.tags.map((tag, i_3) => (
                                <Chip key={i_3} label={tag} className="mt-1 mr-1 capitalize" />
                            ))}
                        </div>
                    )}
                </BlockContainer>
            </div>
            <Dialog css={dialogCSS} open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogContent
                    sx={{
                        width: 600,
                    }}
                >
                    <div className="opacity-80 text-sm" onClick={(e) => e.stopPropagation()}>
                        <InputBase
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                                        onChange={(e) => setItemContent(e.target.value)}
                                        css={f14}
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
                                    <Fab css={btn}>
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
                                    <Fab css={btn}>
                                        <Inventory2OutlinedIcon className="font-s20" />
                                    </Fab>
                                </Tooltip>
                            </div>
                            <div className="flex">
                                <Fab css={btn} onClick={handleDelete}>
                                    <DeleteOutlineIcon className="font-s20" />
                                </Fab>
                                <div onClick={handleSave}>
                                    <CustomBtn className="ml-4">
                                        <span className="font-medium">Save</span>
                                    </CustomBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
