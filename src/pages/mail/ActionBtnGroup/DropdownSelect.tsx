/**@jsxImportSource @emotion/react */
import { resetFab } from "~/components/CSS";
import { css } from "@emotion/react";
import { Fab } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, MouseEvent } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { selectedTypes } from "../types";
const starFab = css`
    ${resetFab}
    width: 40px;
    height: 40px;
`;
function DropdownSelect() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleSelect = (type: selectedTypes) => {
        window.dispatchEvent(new CustomEvent("mail/uncheckAll"));
        switch (type) {
            case "starred":
                window.dispatchEvent(new CustomEvent("mail/checkStarred"));
                break;
            case "unStarred":
                window.dispatchEvent(new CustomEvent("mail/checkUnstarred"));
                break;
            case "important":
                window.dispatchEvent(new CustomEvent("mail/checkImportant"));
                break;
            case "unImportant":
                window.dispatchEvent(new CustomEvent("mail/checkUnimportant"));
                break;
            case "all":
                window.dispatchEvent(new CustomEvent("mail/checkAll"));
                break;
            case "none":
                window.dispatchEvent(new CustomEvent("mail/uncheckAll"));
                break;
        }
        handleClose();
    };
    return (
        <>
            <Fab css={starFab} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                <KeyboardArrowDownIcon />
            </Fab>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleSelect("all")}>
                    <span className="text-sm capitalize">All</span>
                </MenuItem>
                <MenuItem onClick={() => handleSelect("none")}>
                    <span className="text-sm capitalize">None</span>
                </MenuItem>
                <MenuItem onClick={() => handleSelect("important")}>
                    <span className="text-sm capitalize">Important</span>
                </MenuItem>
                <MenuItem onClick={() => handleSelect("unImportant")}>
                    <span className="text-sm capitalize">Unimportant</span>
                </MenuItem>
                <MenuItem onClick={() => handleSelect("starred")}>
                    <span className="text-sm capitalize">Starred</span>
                </MenuItem>
                <MenuItem onClick={() => handleSelect("unStarred")}>
                    <span className="text-sm capitalize">Unstarred</span>
                </MenuItem>
            </Menu>
        </>
    );
}

export default DropdownSelect;
