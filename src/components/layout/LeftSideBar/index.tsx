/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect } from "react";
import { css } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { Fab } from "@mui/material";
import { NavLink } from "react-router-dom";
import favicon from "~/assets/imgs/favicon.svg";
import reactIcon from "~/assets/imgs/react.svg";
import avatar from "~/assets/imgs/avatar.jpg";
import SideBarLink from "../../SideBarLink";
import Links from "./links";

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
    z-index: 1000;
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
        <NavLink to={path}>
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
    const [active, setActive] = useState("analytics");
    useEffect(() => {
        const handler = () => {
            if (window.innerWidth <= 1200) {
                handleHide();
                wrapperDOM.current!.style.position = "fixed";
            } else window.dispatchEvent(new CustomEvent("openLeftSideBar"));
        };
        window.addEventListener("resize", handler);
        window.addEventListener("load", handler);
        return () => {
            window.removeEventListener("resize", handler);
        };
    }, []);
    const handleHide = () => {
        if (wrapperDOM.current) {
            wrapperDOM.current.style.marginLeft = `-280px`;
            window.dispatchEvent(
                new CustomEvent("closedLeftSideBar", {
                    detail: wrapperDOM.current,
                })
            );
        }
    };
    const renderLinks = (group: number) => {
        return Links.map(
            (Link, index) =>
                Link.group === group && (
                    <div
                        className="rounded"
                        onClick={() => setActive(Link.path)}
                        key={index}
                        css={css`
                            ${active === Link.path ? "background-color: rgba(255, 255, 255, 0.1)" : ""}
                        `}
                    >
                        <CustomNavLink path={`${Link.path}`}>
                            <Link.icon css={linkIconCSS} />
                            <div>{Link.text}</div>
                        </CustomNavLink>
                    </div>
                )
        );
    };
    return (
        <>
            <div ref={wrapperDOM} css={wrapperCSS} className="text-white relative shrink-0">
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
                <div
                    className="overflow-y-auto"
                    css={css`
                        height: calc(100vh - 72px);
                    `}
                >
                    <div>
                        <div className="p-4 pb-3.5">
                            <div className="flex flex-col items-center">
                                <div className="mb-6">
                                    <img src={avatar} alt="avatar" css={avatarCSS} />
                                </div>
                                <div className="text-sm font-medium mb-1">Anosvalodiar</div>
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
                            {renderLinks(1)}
                            <LinksGroup label="APPLICATIONS" desc="Custom made application designs" />
                            {renderLinks(2)}
                        </div>
                    </div>
                    <div className="py-12 flex justify-center">
                        <img src={favicon} alt="favicon" className="w-14 opacity-30" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LeftSideBar;
