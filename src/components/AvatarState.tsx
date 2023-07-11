/**@jsxImportSource @emotion/react */
import { Avatar } from "@mui/material";
import { css } from "@emotion/react";

interface prop {
    src?: string;
    alt: string;
    sizes: string;
    state: string;
}

function AvatarState({ state, src, alt, sizes, ...args }: prop) {
    let indicatirColor;
    if (state === "on") indicatirColor = "rgb(76, 175, 80)";
    if (state === "off") indicatirColor = "rgb(100, 100, 100)";
    if (state === "pending") indicatirColor = "rgb(255, 193, 7)";
    const indicator = css`
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid #fff;
        background-color: ${indicatirColor};
    `;
    return (
        <div className="relative">
            <Avatar {...args} alt={alt || "avatar"} src={src} sizes={sizes} />
            <div className="absolute right-0 -bottom-0.5" css={indicator}></div>
        </div>
    );
}

export default AvatarState;
