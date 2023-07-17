/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { Fab, Button, Avatar, Tooltip, Chip } from "@mui/material";
import { resetFab } from "~/components/CSS";
import BlockContainer from "~/components/BlockContainer";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useEffect, useRef, useState, MouseEvent } from "react";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import { msgType } from "./types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { colorDanger, colorWarn } from "~/components/colors";
const actionBtns = css`
    ${resetFab}
    width: 40px;
    height: 40px;
`;
const content = css`
    font-size: 15px;
    line-height: 22.5px;
`;
const f200 = css`
    font-size: 100px;
`;
const btns = css`
    border-radius: 20px;
    text-transform: capitalize;
    border-color: rgb(79, 70, 229) !important;
`;

function Labels({ tags }: { tags: string[] }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    return (
        <div>
            <Tooltip placement="bottom" title="Labels">
                <Fab
                    css={actionBtns}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <LocalOfferOutlinedIcon />
                </Fab>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {tags.map((tag) => (
                    <MenuItem onClick={handleClose} key={tag}>
                        <span className="text-sm capitalize">{tag}</span>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

function MailContent() {
    const paraph = useRef<HTMLParagraphElement>(null);
    const [avt, setAvt] = useState<string | undefined>("");
    const [tags, setTags] = useState<string[]>([]);
    const [name, setName] = useState<string | undefined>("");
    const [title, setTitle] = useState<string | undefined>("");
    const [recieved, setRecieved] = useState(false);
    const [important, setImportant] = useState(false);
    const [starred, setStarred] = useState(false);
    useEffect(() => {
        window.addEventListener("mail/openMessage", (e: CustomEventInit<msgType>) => {
            setRecieved(true);
            setAvt(e.detail!.avatar);
            setName(e.detail!.name);
            setTitle(e.detail!.title);
            setImportant(e.detail!.important);
            setStarred(e.detail!.starred);
            setTags(e.detail!.tags);
            if (paraph.current) paraph.current.innerHTML = e.detail!.content;
        });
    }, []);
    return (
        <div className="grow h-full overflow-hidden relative">
            <div className="h-full overflow-auto relative z-10">
                <div>
                    <div className="h64 bg-color flex justify-end px-2">
                        <div className="flex items-center gap-1">
                            <Labels tags={tags} />
                            <Tooltip placement="bottom" title="Important">
                                <Fab css={actionBtns}>
                                    <InfoOutlinedIcon css={important ? colorDanger : ""} />
                                </Fab>
                            </Tooltip>
                            <Tooltip placement="bottom" title="Starred">
                                <Fab css={actionBtns}>
                                    <StarOutlineRoundedIcon css={starred ? colorWarn : ""} />
                                </Fab>
                            </Tooltip>
                            <Fab css={actionBtns}>
                                <MoreVertIcon />
                            </Fab>
                        </div>
                    </div>
                    <div className="bg-white px-6 py-5 border-y border-solid">
                        <div className="flex flex-wrap justify-between items-center">
                            <h2 className="text-xl">{title}</h2>
                            <div className="flex flex-wrap">
                                {tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        className="mr-2 mt-2"
                                        sx={{
                                            backgroundColor: "rgb(187, 222, 251)",
                                            color: "rgb(21, 101, 192)",
                                            textTransform: "capitalize",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-color text-sm">
                    <BlockContainer>
                        <div className="px-6 py-8 bg-white">
                            <div className="flex items-center">
                                <Avatar src={avt} />
                                <div className="ml-4">
                                    <div className="font-medium">{name}</div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <div>
                                            to <b>me</b>
                                        </div>
                                        <KeyboardArrowDownOutlinedIcon className="font-s20" />
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 opacity-80 whitespace-pre-line" ref={paraph} css={content}></p>
                        </div>
                        <div className="p-6 border-t border-solid rounded-br-xl rounded-bl-xl bg-color">
                            <div className="flex justify-start gap-3">
                                <Button className="text-darkPurple" css={btns} variant="outlined">
                                    <ReplyOutlinedIcon />
                                    <span>Reply</span>
                                </Button>
                                <Button className="text-darkPurple" css={btns} variant="outlined">
                                    <ReplyOutlinedIcon />
                                    <span>Reply All</span>
                                </Button>
                                <Button className="text-darkPurple" css={btns} variant="outlined">
                                    <KeyboardDoubleArrowRightOutlinedIcon />
                                    <span>Forward</span>
                                </Button>
                            </div>
                        </div>
                    </BlockContainer>
                </div>
            </div>
            {!recieved && (
                <div className="flex justify-center w-full h-full items-center absolute z-20 top-0 bg-white">
                    <div className="text-center opacity-40">
                        <DraftsOutlinedIcon css={f200} />
                        <div className="text-2xl font-medium">Select a mail to read</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MailContent;
