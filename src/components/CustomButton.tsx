/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Fab } from "@mui/material";
import { resetFab } from "./CSS";
import { children } from "~/types";

interface props extends children {
    css_?: unknown;
    className?: string;
    style?: object;
}

function CustomBtn({ children, css_, className, style }: props) {
    const btnCSS = css`
        ${resetFab}
        width: auto;
        height: auto;
        padding: 10px 12px;
        text-transform: capitalize;
        ${css_}
    `;
    return (
        <Fab variant="extended" css={btnCSS} className={className} style={style}>
            {children}
        </Fab>
    );
}

export default CustomBtn;
