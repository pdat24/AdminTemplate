/** @jsxImportSource @emotion/react */
import { type children } from "~/types";
import { css } from "@emotion/react";

const wrapperCSS = css`
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
    border-radius: 6px;
    margin: 0px 0px 4px;
    padding: 10px 16px;
    color: rgba(255, 255, 255, 0.7);
    align-items: flex-end;
    font-size: 14px;
    gap: 16px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.05) !important;
        color: rgb(255, 255, 255);
    }
`;

function SideBarLink({ children }: children) {
    return <div css={wrapperCSS}>{children}</div>;
}

export default SideBarLink;
