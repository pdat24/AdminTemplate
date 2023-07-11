/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { children } from "~/types";

function BlockContainer({
    children,
    className,
    css_,
    style,
}: children & { className?: string; css_?: unknown; style?: object }) {
    const wrapperCSS = css`
        ${css_};
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
            rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        border-radius: 12px;
    `;
    return (
        <div css={wrapperCSS} className={className} style={style}>
            {children}
        </div>
    );
}

export default BlockContainer;
