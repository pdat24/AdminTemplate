/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { resetFab } from "~/components/CSS";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { Tooltip, Fab } from "@mui/material";
import { useState, MouseEvent, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Context } from "../context";
import { msgType, validTags } from "../types";
const actionBtns = css`
    ${resetFab}
    width: auto;
    height: auto;
`;

function AddLabel({ checkedList }: { checkedList: msgType[] }) {
    const [msgs, setMsgs] = useContext(Context);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleAddLabel = (type: validTags) => {
        const newMsgs = msgs.filter((msg) => {
            if (checkedList.includes(msg) && !msg.tags.includes(type)) {
                msg.tags.push(type);
            }
            return true;
        });
        setMsgs instanceof Function && setMsgs(newMsgs);
        handleClose();
    };
    return (
        <>
            <Tooltip placement="bottom" title="Add label">
                <Fab
                    css={actionBtns}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <LocalOfferOutlinedIcon className="mx-2" />
                </Fab>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleAddLabel("personal")}>
                    <span className="text-sm capitalize">personal</span>
                </MenuItem>
                <MenuItem onClick={() => handleAddLabel("work")}>
                    <span className="text-sm capitalize">work</span>
                </MenuItem>
                <MenuItem onClick={() => handleAddLabel("payments")}>
                    <span className="text-sm capitalize">payments</span>
                </MenuItem>
                <MenuItem onClick={() => handleAddLabel("accounts")}>
                    <span className="text-sm capitalize">accounts</span>
                </MenuItem>
                <MenuItem onClick={() => handleAddLabel("forums")}>
                    <span className="text-sm capitalize">forums</span>
                </MenuItem>
                <MenuItem onClick={() => handleAddLabel("invoices")}>
                    <span className="text-sm capitalize">invoices</span>
                </MenuItem>
            </Menu>
        </>
    );
}

export default AddLabel;
