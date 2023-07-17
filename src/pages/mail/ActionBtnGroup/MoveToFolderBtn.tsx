/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import { resetFab } from "~/components/CSS";
import { Tooltip, Fab } from "@mui/material";
import { useState, MouseEvent, useContext } from "react";
import { Context } from "../context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { msgType, typeMessage } from "../types";

const actionBtns = css`
    ${resetFab}
    width: auto;
    height: auto;
`;

function MoveToFolderBtn({ checkedList }: { checkedList: msgType[] }) {
    const [msgs, setMsgs] = useContext(Context);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleMove = (place: typeMessage) => {
        const newMsgs = msgs.filter((msg) => {
            if (checkedList.includes(msg)) {
                msg.type = place;
                return false;
            }
            return true;
        });
        setMsgs instanceof Function && setMsgs(newMsgs);
        handleClose();
    };
    return (
        <>
            <Tooltip placement="bottom" title="Move to folder">
                <Fab
                    css={actionBtns}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <FolderOpenOutlinedIcon className="mx-2" />
                </Fab>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleMove("inbox")}>
                    <span className="text-sm">Inbox</span>
                </MenuItem>
                <MenuItem onClick={() => handleMove("sent")}>
                    <span className="text-sm">Sent</span>
                </MenuItem>
                <MenuItem onClick={() => handleMove("draft")}>
                    <span className="text-sm">Draft</span>
                </MenuItem>
                <MenuItem onClick={() => handleMove("spam")}>
                    <span className="text-sm">Spam</span>
                </MenuItem>
                <MenuItem onClick={() => handleMove("trash")}>
                    <span className="text-sm">Trash</span>
                </MenuItem>
            </Menu>
        </>
    );
}
export default MoveToFolderBtn;
