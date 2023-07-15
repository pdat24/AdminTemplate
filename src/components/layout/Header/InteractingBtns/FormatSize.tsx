/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Icon, iconCSS } from "./components";
import * as React from "react";
import Menu from "@mui/material/Menu";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import Slider from "@mui/material/Slider";

function FormatSize() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const marks = [
        {
            value: 70,
            label: "70",
        },
        {
            value: 80,
            label: "80",
        },
        {
            value: 90,
            label: "90",
        },
        {
            value: 100,
            label: "100",
        },
        {
            value: 110,
            label: "110",
        },
        {
            value: 120,
            label: "120",
        },
        {
            value: 130,
            label: "130",
        },
    ];
    return (
        <>
            <div
                className="inline-block"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Icon>
                    <FormatSizeIcon css={iconCSS} />
                </Icon>
            </div>
            <Menu sx={{ transform: "translateX(-10%)" }} anchorEl={anchorEl} open={open} onClose={handleClose}>
                <div className="font-medium text-center my-2">
                    <FormatSizeIcon css={iconCSS} className="font-s20" />
                    <span className="ml-2">Font Size</span>
                </div>
                <div style={{ width: "320px" }} className="px-6">
                    <Slider defaultValue={100} valueLabelDisplay="auto" step={10} marks={marks} min={70} max={130} />
                </div>
            </Menu>
        </>
    );
}

export default FormatSize;
