/**@jsxImportSource @emotion/react */
import { Divider, css } from "@mui/material";
import Card from "@mui/material/Card";
import projectChart1 from "~/assets/imgs/projectChart1.svg";
import projectChart2 from "~/assets/imgs/projectChart2.svg";
import CardActions from "@mui/material/CardActions";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CardContent from "@mui/material/CardContent";
import { Fab, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { resetFab } from "~/components/CSS";
import { useState, ReactNode, Fragment } from "react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { floatUp } from "~/components/Animations";
import colors from "~/components/colors";

const pad0 = css`
    padding: 0;
`;
const bodyCard = css`
    font-size: 64px;
    font-weight: 700;
    line-height: 64px;
`;

const textColor = css`
    color: rgb(17, 24, 39);
`;
const firstCSS = css`
    ${textColor}
    min-height: 150px;
    background-color: rgb(232, 234, 246);
`;
const lh48 = css`
    line-height: 48px;
`;
const secondCSS = css`
    min-height: 150px;
    background-color: rgb(232, 245, 233);
    color: rgb(46, 125, 50);
`;
const belowItemCSS = css`
    background-color: rgb(246, 249, 251);
    ${textColor}
`;
const lh36 = css`
    line-height: 36px;
`;
const btnCSS = css`
    border: none !important;
    text-transform: capitalize;
    border-radius: 20px;
    background: transparent;
    font-weight: 500;
    padding: 8px 12px;
    color: rgb(17, 24, 39);
`;
const overviewLetter = css`
    color: rgb(107, 114, 128);
`;
const fontS13 = css`
    font-size: 13px;
`;
const blockShadow = css`
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;
const radius12 = css`
    border-radius: 12px;
    ${blockShadow}
`;

function ButtonCircular({ children }: { children: ReactNode }) {
    const style = {
        height: "auto",
        width: "auto",
        padding: "12px",
        zIndex: 1,
    };
    return (
        <Fab css={resetFab} style={style}>
            {children}
        </Fab>
    );
}
interface prop {
    number: string | number;
    footText: string;
    label: string;
    desc: string;
    color: string;
}

function TaskCard(props: prop) {
    return (
        <Card sx={{ minWidth: 261.5 }} className="w-fit " css={radius12}>
            <CardContent css={pad0}>
                <div className="flex justify-between items-center pt-3 px-1.5">
                    <div className="px-4">{props.label}</div>
                    <ButtonCircular>
                        <MoreVertIcon />
                    </ButtonCircular>
                </div>
                <div
                    className="text-center mt-2"
                    css={css`
                        color: ${props.color};
                    `}
                >
                    <div css={bodyCard}>{props.number}</div>
                    <div className="font-medium">{props.desc}</div>
                </div>
            </CardContent>
            <CardActions className="justify-center mt-5 mb-6" css={pad0}>
                <div>{props.footText}</div>
            </CardActions>
        </Card>
    );
}

function TasksBlock() {
    const tasks: prop[] = [
        { number: "08", color: colors.primary, desc: "Due Tasks", footText: "Completed: 7", label: "Today" },
        { number: 10, color: colors.danger, desc: "Tasks", footText: "Yesterday's overdue: 2", label: "Overdue" },
        { number: 20, color: colors.warning, desc: "Open", footText: "Closed today: 0", label: "Issues" },
        { number: "04", color: colors.success, desc: "Proposals", footText: "Implemented: 8", label: "Features" },
    ];
    return (
        <div className="flex flex-wrap justify-center gap-6">
            {tasks.map((props, index) => (
                <TaskCard key={index} {...props} />
            ))}
        </div>
    );
}
const activeStyle = (active: boolean) => {
    if (active) {
        return {
            background: "#eaebee",
        };
    }
    return {};
};

function Block2() {
    const [active, setAvtive] = useState(0);
    const blockClasses =
        "grow rounded-xl flex justify-center flex-col items-center font-medium capitalize py-8 px-2 shrink basis-0";
    const content = [
        { number: 4, text: "Fixed" },
        { number: 3, text: "Won't fixed" },
        { number: 8, text: "Re-opened" },
        { number: 6, text: "Needs Triage" },
    ];
    return (
        <div className="p-6 bg-white rounded-xl mt-6" css={blockShadow}>
            <div className="flex justify-between">
                <h2 css={textColor} className="font-medium">
                    Github Issues Summary
                </h2>
                <div>
                    <Button
                        onClick={() => setAvtive(0)}
                        css={btnCSS}
                        variant="outlined"
                        style={activeStyle(0 === active)}
                    >
                        This Week
                    </Button>
                    <Button
                        onClick={() => setAvtive(1)}
                        css={btnCSS}
                        variant="outlined"
                        style={activeStyle(1 === active)}
                    >
                        Last Week
                    </Button>
                </div>
            </div>
            <div
                className="flex mt-3"
                css={css`
                    @media (max-width: 1200px) {
                        flex-direction: column;
                    }
                `}
            >
                <div className="grow shrink basis-0">
                    <img src={projectChart1} alt="chart" className="no-drag mx-auto" />
                </div>
                <div className="grow shrink basis-0">
                    <div className="text-sm" css={overviewLetter}>
                        Overview
                    </div>
                    <div className="mt-6">
                        <div className="flex gap-4">
                            <div className={blockClasses} css={firstCSS}>
                                <p className="text-5xl" css={lh48}>
                                    204
                                </p>
                                <p className="mt-1">New issue</p>
                            </div>
                            <div className={blockClasses} css={secondCSS}>
                                <p className="text-5xl" css={lh48}>
                                    75
                                </p>
                                <p className="mt-1">Closed</p>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4">
                            {content.map((elem, index) => (
                                <div key={index} className={blockClasses} css={belowItemCSS}>
                                    <p className="text-4xl" css={lh36}>
                                        {elem.number}
                                    </p>
                                    <p className="mt-1 text-xs">{elem.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Block3() {
    const [active, setAvtive] = useState(0);
    const [active2, setAvtive2] = useState(0);
    const data = [
        { label: "Group Meeting", time: "in 32 minnutes", place: "Conference room 1B" },
        { label: "Coffee Break", time: "10:30 AM", place: "" },
        { label: "Public Beta Release", time: "11:00 AM", place: "" },
        { label: "Lunch", time: "09:30 PM", place: "" },
        { label: "Dinner with David", time: "12:10 PM", place: "Magnolia" },
        { label: "Jane's Birthday Party", time: "05:30 PM", place: "Home" },
        { label: "Overseer's Retirement Party", time: "07:30 PM", place: "Overseer's room" },
    ];
    return (
        <div
            className="flex mt-6 gap-6"
            css={css`
                @media (max-width: 1200px) {
                    flex-direction: column;
                }
            `}
        >
            <div
                className="grow shrink overflow-hidden flex flex-col basis-1 rounded-xl"
                css={css`
                    ${blockShadow}
                    @media (max-width: 1200px) {
                        flex: 1;
                    }
                `}
            >
                <div className="bg-white p-6">
                    <div className="flex justify-between">
                        <div css={textColor} className="font-medium">
                            Task Distribution
                        </div>
                        <div>
                            <Button
                                onClick={() => setAvtive2(0)}
                                css={btnCSS}
                                variant="outlined"
                                style={activeStyle(0 === active2)}
                            >
                                This Week
                            </Button>
                            <Button
                                onClick={() => setAvtive2(1)}
                                css={btnCSS}
                                variant="outlined"
                                style={activeStyle(1 === active2)}
                            >
                                Last Week
                            </Button>
                        </div>
                    </div>
                    <img src={projectChart2} alt="chart" className="no-drag" />
                </div>
                <div
                    css={css`
                        min-height: 160px;
                    `}
                    className="flex border border-solid bg-color grow items-center justify-center"
                >
                    <div className="text-center opacity-80 grow shrink-0 basis-1">
                        <div className="font-bold text-4xl">594</div>
                        <div>New Tasks</div>
                    </div>
                    <Divider
                        css={css`
                            width: 1px;
                            height: 100%;
                            background-color: #ddd;
                        `}
                    />
                    <div className="text-center opacity-80 grow shrink-0 basis-1">
                        <div className="font-bold text-4xl">287</div>
                        <div>Completed tasks</div>
                    </div>
                </div>
            </div>
            <div className="grow shrink basis-0 p-6 rounded-xl bg-white" css={blockShadow}>
                <div className="flex justify-between">
                    <div css={textColor} className="font-medium">
                        Schedule
                    </div>
                    <div>
                        <Button
                            onClick={() => setAvtive(0)}
                            css={btnCSS}
                            variant="outlined"
                            style={activeStyle(0 === active)}
                        >
                            Today
                        </Button>
                        <Button
                            onClick={() => setAvtive(1)}
                            css={btnCSS}
                            variant="outlined"
                            style={activeStyle(1 === active)}
                        >
                            Tomorow
                        </Button>
                    </div>
                </div>
                <div className="mt-2">
                    {data.map((elem, index) => (
                        <Fragment key={index}>
                            <div className="flex justify-between my-4 px-2 mt-2">
                                <div>
                                    <div className="text-sm">{elem.label}</div>
                                    <div className="flex">
                                        <div className="mt-1 opacity-50">
                                            <AccessTimeIcon className="font-s20" />
                                            <span css={fontS13} className="ml-2 overviewLetter">
                                                {elem.time}
                                            </span>
                                        </div>
                                        {elem.place && (
                                            <div className="mt-1 ml-5 opacity-50">
                                                <PlaceOutlinedIcon className="font-s20" />
                                                <span css={fontS13} className="ml-2 overviewLetter">
                                                    {elem.place}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ButtonCircular>
                                    <ChevronRightOutlinedIcon />
                                </ButtonCircular>
                            </div>
                            {index !== data.length - 1 && <hr className="my-3" />}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

const wrapperCSS = css`
    animation: ${floatUp} 250ms ease-in-out;
`;

function Home() {
    return (
        <div css={wrapperCSS}>
            <TasksBlock />
            <Block2 />
            <Block3 />
        </div>
    );
}

export default Home;
