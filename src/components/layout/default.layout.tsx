/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { children } from "~/types";
import LeftSideBar from "./LeftSideBar";
import Header from "./Header";
import RightSideBar from "./RightSideBar";

const wrapper = css`
    overflow: auto;
    height: calc(100vh - 64px);
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background: #eee;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
            background: #ddd;
        }
    }
`;

function DefaultLayout({ children }: children) {
    return (
        <main className="flex overflow-x-hidden">
            <div className="flex grow w-full">
                <LeftSideBar />
                <div className="grow w-0">
                    <Header />
                    <div className="relative z-10">
                        <div css={wrapper}>{children}</div>
                    </div>
                </div>
            </div>
            <RightSideBar />
        </main>
    );
}

export default DefaultLayout;
