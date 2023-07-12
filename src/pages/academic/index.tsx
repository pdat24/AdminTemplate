/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MenuItem, SelectChangeEvent, Switch, Chip, Alert } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import SchoolIcon from "@mui/icons-material/School";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import BlockContainer from "~/components/BlockContainer";
import HeaderBg from "~/assets/imgs/academicHeaderBg.svg";
import { floatUp } from "~/components/Animations";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import colors from "~/components/colors";

const headerCSS = css`
    background-color: #1e293b;
`;
const maxW640 = css`
    max-width: 640px;
`;
const heading = css`
    line-height: 72px;
    font-size: 52px;
`;

const filterSelectorCSS = css`
    label {
        background: rgb(241, 245, 249);
        width: auto;
        padding: 0 4px;
    }
    > div:first-of-type > div:first-of-type {
        font-size: 14px;
    }
    width: 136px;
`;
const searchCSS = css`
    input {
        font-size: 14px;
    }
    > div {
        height: 100%;
    }
`;
const cardFooter = css`
    background-color: rgb(246, 249, 251);
    height: 72px;
`;
const floatAnimation = css`
    animation: ${floatUp} 250ms ease-in-out;
`;
const h310 = css`
    height: 310px;
`;
const rouded20 = css`
    border-radius: 20px;
`;
const w256 = {
    width: "256px",
};

function Course({ type, completed, desc }: { type: string; completed: boolean; desc: string }) {
    const web = css`
        background-color: rgb(210, 234, 252);
        color: rgb(19, 90, 145);
    `;
    const firebase = css`
        color: rgb(153, 115, 4);
        background-color: rgb(255, 242, 205);
    `;
    const android = css`
        background-color: rgb(219, 239, 220);
        color: rgb(45, 105, 48);
    `;
    const cloud = css`
        background-color: rgb(223, 229, 231);
        color: rgb(57, 75, 83);
    `;
    const setColor = (type: string) => {
        switch (type.toLowerCase()) {
            case "web":
                return web;
            case "firebase":
                return firebase;
            case "android":
                return android;
            case "cloud":
                return cloud;
            default:
                return css``;
        }
    };
    return (
        <BlockContainer className="bg-white text-black">
            <div className="p-6" css={h310}>
                <div className="flex justify-between">
                    <Chip label={type} className="font-medium" css={setColor(type)} />
                    {completed ? (
                        <CheckCircleOutlinedIcon
                            css={css`
                                color: ${colors.success};
                            `}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <div className="mt-6">
                    <div className="font-medium">{desc}</div>
                    <div className="text-sm opacity-50 mt-1 font-s13">
                        Dive deep into User Management on iOS apps using Firebase
                    </div>
                </div>
                <div className="mt-12 opacity-50 text-sm">
                    <div>
                        <WatchLaterIcon className="font-s20" />
                        <span className="ml-2">45 minutes</span>
                    </div>
                    <div>
                        <SchoolIcon className="font-s20" />
                        <span className="ml-2">{completed ? "Completed once" : "Never completed"}</span>
                    </div>
                </div>
            </div>
            <div css={cardFooter}>
                <div className="h-0.5 bg-stone-300">
                    <div className="h-full bg-darkPurple"></div>
                </div>
                <div className="flex items-center h-full justify-end p-6 ">
                    <Button variant="contained" className="capitalize bg-darkPurple" css={rouded20}>
                        <span className="mr-1">Continue</span>
                        <EastIcon className="font-s20" />
                    </Button>
                </div>
            </div>
        </BlockContainer>
    );
}

// interface initDat

function Body() {
    const [category, setCategory] = useState(1);
    const [searchBarText, setSearchBarText] = useState("");
    const [hiddenCompleted, setHiddenCompleted] = useState(false);
    const handleChangeType = (e: SelectChangeEvent) => setCategory(+e.target.value);
    const handleSwitch = () => setHiddenCompleted(!hiddenCompleted);
    const handleSearch = (e: ChangeEvent) => setSearchBarText(e.target.value);
    const items = [
        { value: 1, text: "All" },
        { value: 2, text: "Web" },
        { value: 3, text: "Firebase" },
        { value: 4, text: "Cloud" },
        { value: 5, text: "Android" },
    ];
    const courseWrapperCSS = css`
        ${floatAnimation}
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(344px, 1fr));
        gap: 32px;
    `;
    const initData = useRef([
        { type: items[1].text, completed: 1, desc: "Basics of Angular" },
        { type: items[1].text, completed: 0, desc: "Basics of TypeScript" },
        { type: items[4].text, completed: 1, desc: "Android N: Quick Settings" },
        { type: items[3].text, completed: 1, desc: "Build an App for the Google Assistant with Firebase" },
        { type: items[4].text, completed: 0, desc: "Keep Sensitive Data Safe and Private" },
        { type: items[2].text, completed: 0, desc: "Manage Your Pivotal Cloud Foundry App's Using Apigee Edge" },
        { type: items[1].text, completed: 1, desc: "Build a PWA Using Workbox" },
        { type: items[4].text, completed: 0, desc: "Cloud Functions for Firebase" },
        { type: items[3].text, completed: 1, desc: "Building a gRPC Service with Java" },
        { type: items[3].text, completed: 1, desc: "Looking at Campaign Finance with BigQuery" },
        { type: items[1].text, completed: 0, desc: "Personalize Your iOS App with Firebase User Management" },
        { type: items[1].text, completed: 1, desc: "Customize Network Topology with Subnetwork" },
        { type: items[2].text, completed: 0, desc: "Building Beautiful UIs with Flutter" },
        { type: items[1].text, completed: 0, desc: "Firebase Android" },
        { type: items[4].text, completed: 1, desc: "Simulating a Thread Network Using OpenThread" },
        { type: items[3].text, completed: 1, desc: "Your First Progressive Web App" },
        { type: items[1].text, completed: 1, desc: "Launch Cloud Datalab" },
        { type: items[2].text, completed: 0, desc: "Cloud Firestore" },
    ]);
    const [data, setData] = useState(initData.current);
    useEffect(() => {
        let newData = [];
        if (!hiddenCompleted) newData = initData.current;
        else newData = initData.current.filter((item) => item.completed === 0);
        if (searchBarText)
            newData = newData.filter((item) => item.desc.toLowerCase().includes(searchBarText.toLowerCase()));
        if (items[category - 1].text.toLowerCase() !== "all")
            newData = newData.filter((item) => item.type.toLowerCase() === items[category - 1].text.toLowerCase());
        setData(newData);
    }, [hiddenCompleted, searchBarText, category]);
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <FormControl fullWidth css={filterSelectorCSS}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select value={String(category)} onChange={handleChangeType}>
                            {items.map((item, index) => (
                                <MenuItem key={index} value={item.value}>
                                    {item.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Search for a course"
                        variant="outlined"
                        value={searchBarText}
                        onChange={handleSearch}
                        css={searchCSS}
                        style={w256}
                    />
                </div>
                <label htmlFor="hideCompletedBtn" className="mr-4 cursor-pointer">
                    <Switch id="hideCompletedBtn" onChange={handleSwitch} />
                    <span className="text-black select-none">Hide completed</span>
                </label>
            </div>
            <div className="mt-10" css={courseWrapperCSS}>
                {data.length !== 0 ? (
                    data.map((item, index) => (
                        <Course desc={item.desc} key={index} type={item.type} completed={!!item.completed} />
                    ))
                ) : (
                    <Alert severity="info">Not Found Courses!</Alert>
                )}
            </div>
        </div>
    );
}

function Academic() {
    return (
        <div className="text-white flex flex-col min-h-full">
            <div css={headerCSS} className="relative">
                <div className="text-center p-16">
                    <div className="text-lg font-medium relative z-10">FUSE ACADEMY</div>
                    <div className="mt-1 font-extrabold relative z-10" css={heading}>
                        What do you want to learn today?
                    </div>
                    <div className="text-xl mx-auto mt-6 opacity-80 relative z-10" css={maxW640}>
                        Our courses will step you through the process of a building small applications, or adding new
                        features to existing applications.
                    </div>
                </div>
                <div
                    className="absolute top-0 h-full w-full"
                    css={css`
                        background-image: url(${HeaderBg});
                    `}
                ></div>
            </div>
            <div className="p-10 bg-color grow">
                <Body />
            </div>
        </div>
    );
}

export default Academic;
