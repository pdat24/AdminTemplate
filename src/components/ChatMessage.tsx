/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const maxW90 = css`
    border-radius: 20px;
    max-width: 90%;
`;

interface msgProp {
    type: "you" | "i";
    children: string;
}
export default function SingleMsg({ type, children }: msgProp) {
    const side = type === "you" ? "text-left" : "text-right";
    const bgColor = type === "you" ? "bg-purple " : "bg-slate-500";
    const mx = type === "you" ? "ml-0" : "mr-4";
    const classes = `${bgColor} text-left inline-block relative right-0 px-4 py-3 text-sm text-white`;
    return (
        <div className={`w-full ${side} ${mx} pb-1`}>
            <div css={maxW90} className={classes}>
                <p
                    css={css`
                        overflow-wrap: break-word;
                    `}
                >
                    {children}
                </p>
            </div>
        </div>
    );
}
