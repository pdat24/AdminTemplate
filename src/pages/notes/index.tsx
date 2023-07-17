/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SearchIcon from "@mui/icons-material/Search";
import { Fab, InputBase } from "@mui/material";
import NoteContext from "./NoteContext";
import { resetFab } from "~/components/CSS";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { col1Note, col2Note, col3Note, col4Note, colProp, labelsType } from "./colNotes";
import BlockContainer from "~/components/BlockContainer";
import NoteCreator from "./NoteCreator";
import { useState, Dispatch, SetStateAction } from "react";
import { floatUp } from "~/components/Animations";
import { noteType } from "./colNotes";
import ANote from "./NoteUpdateDialog";
import createId from "~/components/generateID";

const wrapper = css`
    animation: ${floatUp} 300ms ease-in-out;
`;
const searchBarCSS = css`
    min-width: 44px;
`;
const btn = css`
    ${resetFab}
    width: 40px;
    height: 40px;
`;
const w224 = css`
    width: 224px;
`;

const linkCSS = css`
    background-color: transparent;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-height: 44px;
    width: 100%;
    border-radius: 20px;
    margin: 0px 0px 4px;
    padding: 10px 16px;
    color: #333;
    align-items: flex-end;
    cursor: pointer;
    font-size: 14px;
    gap: 16px;
    opacity: 0.7;
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        opacity: 1;
    }
`;
const bgWrapper = css`
    background-color: rgb(246, 249, 251);
    min-height: 100%;
`;
const w240 = css`
    width: 240px;
`;

const id = createId();
function renderNotes(data: colProp[], setData: Dispatch<SetStateAction<colProp[]>>, label: labelsType | noteType) {
    if (label === "archive" || label === "note" || label === "reminder") {
        return data.map(
            (item) =>
                item.type === label && (
                    <div css={wrapper} key={id()}>
                        <ANote onSetNote={setData} note={item} />
                    </div>
                )
        );
    } else
        return data.map(
            (item) =>
                item.tags.includes(label) && (
                    <div css={wrapper} key={id()}>
                        <ANote onSetNote={setData} note={item} />
                    </div>
                )
        );
}

function Notes() {
    const tags = ["Friends", "Personal", "Priority", "Tasks", "Work", "Family"];
    const [type, setType] = useState<noteType | labelsType>("note");
    const [col1, setCol1] = useState(col1Note);
    const [col2, setCol2] = useState(col2Note);
    const [col3, setCol3] = useState(col3Note);
    const [col4, setCol4] = useState(col4Note);
    type navType = { path: noteType; icon: unknown; text: string };
    const typeNav: navType[] = [
        { icon: DriveFileRenameOutlineOutlinedIcon, text: "Notes", path: "note" },
        { icon: NotificationsActiveIcon, text: "Reminders", path: "reminder" },
        { icon: Inventory2OutlinedIcon, text: "Archive", path: "archive" },
    ];
    return (
        <div className="h-full">
            <div className="flex flex-col h-full">
                <div className="px-8 py-6 bg-color flex items-center shrink-0">
                    <div className="text-3xl font-bold" css={w224}>
                        Notes
                    </div>
                    <div className="flex opacity-80 items-center grow">
                        <Fab css={btn}>
                            <SwapVertIcon />
                        </Fab>
                        <label htmlFor="searchNote" className="ml-4 grow">
                            <div
                                className="rounded-3xl border border-solid border-gray-400 px-4 flex items-center"
                                css={searchBarCSS}
                            >
                                <SearchIcon className="font-s20 opacity-70" />
                                <InputBase id="searchNote" placeholder="Search note" className="py-1 px-4 text-sm" />
                            </div>
                        </label>
                    </div>
                </div>
                <div className="grow shrink-0 h-full basis-1 overflow-hidden">
                    <BlockContainer className="bg-white overflow-hidden h-full flex">
                        <div className="h-full overflow-auto  bg-white border-r border-solid shrink-0" css={w240}>
                            <div className="px-4 py-6 overflow-auto">
                                {typeNav.map((Item) => (
                                    <h3
                                        style={type === Item.path ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : {}}
                                        css={linkCSS}
                                        key={Item.path}
                                        onClick={() => {
                                            setType(Item.path);
                                        }}
                                    >
                                        <Item.icon className="opacity-50" />
                                        <div className="font-medium">{Item.text}</div>
                                    </h3>
                                ))}
                                {tags.map((tag) => (
                                    <h3 css={linkCSS} key={tag} onClick={() => setType(tag.toLowerCase())}>
                                        <LocalOfferOutlinedIcon className="opacity-50" />
                                        <div className="font-medium">{tag}</div>
                                    </h3>
                                ))}
                            </div>
                        </div>
                        <div className="overflow-auto grow h-full">
                            <div className="p-6">
                                <BlockContainer
                                    className="flex flex-col items-center border border-solid"
                                    css={bgWrapper}
                                >
                                    <div className="p-3 w-full">
                                        <NoteContext value={[setCol1, setCol2, setCol3, setCol4]}>
                                            <NoteCreator type={type} />
                                        </NoteContext>
                                        <div className="flex overflow-hidden">
                                            <div className="w-1/4 p-2 grow shrink-0 basis-1">
                                                {renderNotes(col1, setCol1, type)}
                                            </div>
                                            <div className="w-1/4 p-2 grow shrink-0 basis-1">
                                                {renderNotes(col2, setCol2, type)}
                                            </div>
                                            <div className="w-1/4 p-2 grow shrink-0 basis-1">
                                                {renderNotes(col3, setCol3, type)}
                                            </div>
                                            <div className="w-1/4 p-2 grow shrink-0 basis-1">
                                                {renderNotes(col4, setCol4, type)}
                                            </div>
                                        </div>
                                    </div>
                                </BlockContainer>
                            </div>
                        </div>
                    </BlockContainer>
                </div>
            </div>
        </div>
    );
}

export default Notes;
