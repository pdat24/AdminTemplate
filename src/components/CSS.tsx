/**@jsxImportSource @emotion/react */
import { css } from "@mui/material";

const resetFab = css`
    background-color: transparent;
    box-shadow: none !important;
    &:active {
        background-color: initial !important;
    }
    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`;

export { resetFab };
