/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Fab } from "@mui/material";
import { children } from "~/types";
import { resetFab } from "~/components/CSS";

function Icon({ children }: children) {
    const wrapperStyle = css`
        width: 40px;
        height: 40px;
        ${resetFab}
    `;
    return <Fab css={wrapperStyle}>{children}</Fab>;
}
const iconCSS = css`
    color: rgba(0, 0, 0, 0.54);
`;
const z2000 = css`
    z-index: 2000;
`;
const fontS32 = css`
    font-size: 32px;
`;

export { Icon, iconCSS, z2000, fontS32 };
