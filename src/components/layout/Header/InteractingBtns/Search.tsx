/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Tooltip, InputBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Icon, iconCSS } from "./components";
import SearchIcon from "@mui/icons-material/Search";
import CustomBtn from "~/components/CustomButton";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { children } from "~/types";
import { Link } from "react-router-dom";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

const z1100 = css`
    z-index: 1100;
`;

function ListItem({ path, children, onClick }: { path: string; onClick: (v: boolean) => void } & children) {
    const style = css`
        &:hover {
            background-color: rgba(30, 41, 59, 0.12);
        }
    `;
    return (
        <Link className="block px-4 py-1.5" to={path} css={style} onClick={() => onClick(true)}>
            <span className="font-medium mr-6 opacity-60">
                <ArrowRightAltOutlinedIcon className="font-s20" />
            </span>
            <span className="text-sm opacity-80">{children}</span>
        </Link>
    );
}

function Search() {
    const [text, setText] = useState("");
    const [showEntry, setShowEntry] = useState(false);
    const features = useRef([
        "Contacts",
        "Mail",
        "Finance",
        "Analytics",
        "Profile",
        "Academic",
        "Crypto",
        "Chat",
        "Notes",
        "Project",
    ]);
    const fit = useRef<string[]>([]);
    const time = useRef(0);
    const handleClose = () => {
        setText("");
        setShowEntry(false);
    };
    const handleOpen = () => setShowEntry(true);

    useEffect(() => {
        document.body.addEventListener("click", (e: MouseEvent) => {
            if (!e.defaultPrevented) handleClose();
        });
    }, []);

    fit.current = useMemo(() => {
        if (time.current++ === 0) return [];
        if (text) return features.current.filter((item) => item.toLowerCase().includes(text));
        return features.current;
    }, [text]);
    return (
        <div className="inline-block" onClick={(e) => e.preventDefault()}>
            <Tooltip title="Click to search" placement="bottom" arrow>
                <div className="inline-block" onClick={handleOpen}>
                    <Icon>
                        <SearchIcon css={iconCSS} />
                    </Icon>
                </div>
            </Tooltip>
            {showEntry && (
                <div className="absolute top-0 bg-white w-full h-full flex items-center left-0" css={z1100}>
                    <InputBase
                        value={text}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                        autoFocus
                        placeholder="Search for a page..."
                        className="w-full mx-6"
                    />
                    <div className="absolute right-3" onClick={handleClose}>
                        <CustomBtn>
                            <CloseIcon />
                        </CustomBtn>
                    </div>
                    {fit.current.length !== 0 && (
                        <div className="absolute w-full bg-white top-full py-2 border-y border-solid">
                            {fit.current.map((elem) => (
                                <ListItem path={"/" + elem.toLowerCase()} key={elem} onClick={handleClose}>
                                    {elem}
                                </ListItem>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
