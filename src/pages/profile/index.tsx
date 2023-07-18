/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import cover from "~/assets/imgs/profile/cover.jpg";
import avatar from "~/assets/imgs/avatar.jpg";
import { Divider } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
// tabs
import About from "./About";
import Photos from "./Photos";
import Timeline from "./Timeline";

const w960 = css`
    width: 100%;
    max-width: 960px;
`;
const avatarCSS = css`
    width: 128px;
    height: 128px;
    margin-top: -72px;
`;
const dividerCSS = css`
    margin: 0 32px;
    height: 32px;
`;

interface props {
    activeTab: number;
    onSetTab: (tab: number) => void;
}

function TabNav({ activeTab, onSetTab }: props) {
    const btnCSS = css`
        color: #777;
        background: transparent;
        border-radius: 20px !important;
        border: none !important;
        text-transform: capitalize;
        user-select: none;
        &:hover {
            background: initial;
        }
    `;
    const shadpwNone = css`
        box-shadow: none;
    `;
    const tabLabels = ["Timeline", "About", "Photos & Videos"];
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group" css={shadpwNone}>
            {tabLabels.map((tab, index) => (
                <Button
                    key={index}
                    onClick={() => onSetTab(index)}
                    style={activeTab === index ? { background: "#ddd", color: "#333" } : {}}
                    css={btnCSS}
                >
                    {tab}
                </Button>
            ))}
        </ButtonGroup>
    );
}

function ProfilePage() {
    const [tab, setTab] = useState(0);
    const tabs = [<Timeline />, <About />, <Photos />];
    return (
        <div className="bg-color">
            <img src={cover} alt="cover" className="object-cover h-80 w-full" />
            <div
                className="bg-white px-8"
                css={css`
                    min-height: 72px;
                `}
            >
                <div
                    className="mx-auto flex h-full"
                    css={css`
                        ${w960}
                        @media (max-width: 1200px) {
                            flex-direction: column;
                            align-items: center;
                            width: 100%;
                            padding-bottom: 16px;
                        }
                    `}
                >
                    <img
                        src={avatar}
                        alt="avatar"
                        className="border-4 border-solid border-white border-circular"
                        css={avatarCSS}
                    />
                    <div
                        className="flex justify-between w-full"
                        css={css`
                            @media (max-width: 1200px) {
                                flex-direction: column;
                                align-items: center;
                                gap: 16px;
                            }
                        `}
                    >
                        <div className="flex items-center">
                            <div className="ml-6">
                                <div className="font-bold">Pham Quoc Dat</div>
                                <div className="opacity-70 text-sm">Hai Duong, VN</div>
                            </div>
                            <Divider orientation="vertical" css={dividerCSS} />
                            <div>
                                <div className="font-bold text-center">200k</div>
                                <div className="opacity-70 text-xs font-medium">FOLLOWERS</div>
                            </div>
                            <div className="ml-6">
                                <div className="font-bold text-center">2k4</div>
                                <div className="opacity-70 text-xs font-medium">FOLLOWING</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <TabNav activeTab={tab} onSetTab={setTab} />
                        </div>
                    </div>
                </div>
            </div>
            <div>{tabs[tab]}</div>
        </div>
    );
}

export default ProfilePage;
