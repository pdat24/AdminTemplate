/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";
import Team from "./Team";
import Home from "./Home";
import Budget from "./Budget";

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
const wrapperCSS = css`
    background-color: #f1f5f9;
`;
const shadpwNone = css`
    box-shadow: none;
`;

function TabNav({ ...others }) {
    const [active, setActive] = useState(0);
    const tabs = ["home", "budget", "team"];
    const pages = [<Home />, <Budget />, <Team />];
    return (
        <div className="py-6 px-3" css={wrapperCSS}>
            <div className="px-6">
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    {...others}
                    css={shadpwNone}
                >
                    {tabs.map((tab, index) => (
                        <Button
                            key={index}
                            onClick={() => setActive(index)}
                            style={active === index ? { background: "#ddd", color: "#333" } : {}}
                            css={btnCSS}
                        >
                            {tab}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className="p-6 pr-0">{pages[active]}</div>
        </div>
    );
}

export default TabNav;
