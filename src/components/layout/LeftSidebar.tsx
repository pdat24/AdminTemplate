/** @jsxImportSource @emotion/react */
import { useRef } from "react";
import { css } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { Fab } from "@mui/material";
import { NavLink } from "react-router-dom";

import favicon from "~/assets/imgs/favicon.svg";
import reactIcon from "~/assets/imgs/react.svg";
import avatar from "~/assets/imgs/avatar.jpg";
import SideBarLink from "../SideBarLink";

const reactLabel = css`
    background-color: rgb(18, 18, 18);
    div {
        color: rgb(97, 218, 251);
    }
    img {
        width: 16px;
    }
`;
const wrapperCSS = css(`
    min-height: 100vh;
    width: 280px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    background-color: rgb(17, 24, 39);
    transition: margin 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`);
const headerCSS = css`
    height: 72px;
`;
const faviconCSS = css`
    width: 32px;
    height: 32px;
`;
const menuCSS = css`
    width: 40px;
    height: 40px;
    background-color: transparent;
    &:hover {
        background-color: rgba(255, 255, 255, 0.08);
    }
    path {
        color: #fff;
    }
    svg {
        width: 20px;
        height: 20px;
    }
`;
const avatarCSS = css`
    width: 96px;
    height: 96px;
    border-radius: 50%;
`;

const linkIconCSS = css`
    width: 22px;
    height: 22px;
`;

import { children } from "~/types";

function CustomNavLink({ path, children }: { path: string } & children) {
    return (
        <NavLink
            to={path}
            style={({ isActive }) =>
                isActive
                    ? {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }
                    : {}
            }
        >
            <SideBarLink>{children}</SideBarLink>
        </NavLink>
    );
}

function LinksGroup({ label, desc }: { label: string; desc: string }) {
    const color = css`
        color: rgb(156, 163, 175);
    `;
    return (
        <div className="px-4 py-2.5 mt-7">
            <h3 className="text-purple font-medium text-sm uppercase">{label}</h3>
            <div className="font-medium text-xs" css={color}>
                {desc}
            </div>
        </div>
    );
}

function LeftSideBar() {
    const wrapperDOM = useRef<HTMLDivElement>(null);
    const handleHide = () => {
        if (wrapperDOM.current) {
            wrapperDOM.current.style.marginLeft = `${-parseFloat(window.getComputedStyle(wrapperDOM.current).width)}px`;
            window.dispatchEvent(
                new CustomEvent("closedLeftSideBar", {
                    detail: wrapperDOM.current,
                })
            );
        }
    };
    return (
        <div ref={wrapperDOM} css={wrapperCSS} className="text-white relative">
            <div css={headerCSS} className="flex items-center px-5 ">
                <div className="grow mx-1 flex text-xs items-center">
                    <img src={favicon} alt="photo" css={faviconCSS} />
                    <div className="mx-2 py-1 px-2 w-fit flex rounded gap-1" css={reactLabel}>
                        <img src={reactIcon} alt="photo" />
                        <div>React</div>
                    </div>
                </div>
                <div>
                    <Fab css={menuCSS} onClick={handleHide}>
                        <MenuIcon />
                    </Fab>
                </div>
            </div>
            <div className="overflow-y-auto">
                <div>
                    <div className="p-4 pb-3.5">
                        <div className="flex flex-col items-center">
                            <div className="mb-6">
                                <img src={avatar} alt="avatar" css={avatarCSS} />
                            </div>
                            <div className="text-sm font-medium mb-1">Pham Quoc Dat</div>
                            <div
                                css={css`
                                    color: rgb(148, 163, 184);
                                `}
                                className="text-xs font-medium"
                            >
                                admin62661@gmail.com
                            </div>
                        </div>
                    </div>
                    <div className="px-3">
                        <LinksGroup label="DASHBOARDS" desc="Unique dashboard designs" />
                        <div>
                            <CustomNavLink path="/">
                                <AssignmentTurnedInOutlinedIcon css={linkIconCSS} />
                                <div>Project</div>
                            </CustomNavLink>
                            <CustomNavLink path="/finance">
                                <PaymentsOutlinedIcon css={linkIconCSS} />
                                <div>Finance</div>
                            </CustomNavLink>
                            <CustomNavLink path="/analytics">
                                <BubbleChartOutlinedIcon css={linkIconCSS} />
                                <div>Analytics</div>
                            </CustomNavLink>
                            <CustomNavLink path="/crypto">
                                <MonetizationOnOutlinedIcon css={linkIconCSS} />
                                <div>Crypto</div>
                            </CustomNavLink>
                            <LinksGroup label="APPLICATIONS" desc="Custom made application designs" />
                            <CustomNavLink path="/academic">
                                <SchoolOutlinedIcon css={linkIconCSS} />
                                <div>Academy</div>
                            </CustomNavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSideBar;
