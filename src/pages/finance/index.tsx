/**@jsxImportSource @emotion/react */
import PaymentIcon from "@mui/icons-material/Payment";
import colors from "~/components/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { css } from "@emotion/react";
import { Fab, Chip, Button } from "@mui/material";
import { resetFab } from "~/components/CSS";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BlockContainer from "~/components/BlockContainer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import greenTick from "~/assets/imgs/greenTick.png";
import redTick from "~/assets/imgs/redExclam.png";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import largeTrending from "~/assets/imgs/largeTrending.svg";
import { floatUp } from "~/components/Animations";

const morevert = css`
    ${resetFab}
    width: auto;
    height: auto;
    padding: 12px;
`;
const btnCSS = css`
    ${resetFab}
    width: auto;
    height: auto;
    padding: 10px 12px;
`;
const transactionBtn = css`
    color: #333;
    border-radius: 20px;
    text-transform: capitalize;
    border-color: #333 !important;
    margin-top: 24px;
`;
const bgpurple = css`
    ${btnCSS};
    background-color: #4f46e5;
    &:hover {
        background-color: rgb(55, 48, 163) !important;
    }
    color: #fff;
`;
const fontS13 = css`
    font-size: 13px;
`;
const lpink = "rgb(255, 205, 210)";
const lpurple = "rgb(197, 202, 233)";
const lgreen = "rgb(178, 223, 219)";
const redIcon = css`
    background-color: ${lpink};
    color: ${colors.danger};
`;
const purpleIcon = css`
    background-color: ${lpurple};
    color: rgb(40, 53, 147);
`;
const greenIcon = css`
    background-color: ${lgreen};
    color: ${colors.success};
`;
const bodyAnimation = css`
    animation: ${floatUp} 250ms ease-in-out;
`;

function TableBlock() {
    function createData(name: string, calories: string, fat: string, carbs: string, protein: string) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData("528651571NT", "Oct 08, 2019", "Morgan Page", "$1,358.75", "COMPLETED"),
        createData("528651571NT", "Oct 08, 2019", "Morgan Page", "$1,358.75", "COMPLETED"),
        createData("528651571NT", "Oct 08, 2019", "Morgan Page", "$1,358.75", "PENDING"),
        createData("528651571NT", "Oct 08, 2019", "Morgan Page", "$1,358.75", "COMPLETED"),
        createData("528651571NT", "Oct 08, 2019", "Morgan Page", "$1,358.75", "COMPLETED"),
    ];
    return (
        <TableContainer
            component={Paper}
            css={css`
                background-color: transparent;
                box-shadow: none;
            `}
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Name&nbsp;(g)</TableCell>
                        <TableCell align="left">Amount&nbsp;(g)</TableCell>
                        <TableCell align="left">Status&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.calories}</TableCell>
                            <TableCell align="left">{row.fat}</TableCell>
                            <TableCell align="left">{row.carbs}</TableCell>
                            <TableCell align="left">
                                {row.protein === "PENDING" ? (
                                    <Chip label={row.protein} css={redIcon} />
                                ) : (
                                    <Chip label={row.protein} css={greenIcon} />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
function Block1() {
    const colorSucc = css`
        color: ${colors.success};
    `;
    const colorErr = css`
        color: ${colors.danger};
    `;
    const data = [
        { label: "Previous Statement", desc: "Paid on February 6, 2022", state: 1 },
        { label: "Current Statement", desc: "Must be paid before March 6, 2022", state: 0 },
    ];
    return (
        <div className="flex gap-6 flex-wrap">
            {data.map((elem, index) => (
                <BlockContainer
                    key={index}
                    className="py-6 pl-6 pr-3 mt-1 relative grow basis-0 shrink bg-white overflow-hidden"
                    css={css`
                        @media (max-width: 600px) {
                            width: 100%;
                            flex-basis: auto;
                        }
                    `}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-medium">{elem.label}</div>
                            <div css={elem.state ? colorSucc : colorErr} className="text-xs font-medium">
                                {elem.desc}
                            </div>
                        </div>
                        <div>
                            <Fab css={morevert}>
                                <MoreVertIcon />
                            </Fab>
                        </div>
                    </div>
                    <div className="flex justify-start mt-6 zIndex gap-12 flex-wrap">
                        <div>
                            <div className="text-xs text-slate-500 font-medium">Card Limit</div>
                            <div className="text-2xl font-medium mt-1">$34,500.00</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium">Spent</div>
                            <div className="text-2xl font-medium mt-1">$34,500.00</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium">Minimum</div>
                            <div className="text-2xl font-medium mt-1">$34,500.00</div>
                        </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-50 w-20">
                        <img src={elem.state ? greenTick : redTick} alt="image" />
                    </div>
                </BlockContainer>
            ))}
        </div>
    );
}

function RankDiv() {
    const fontS18 = css`
        font-size: 18px;
    `;
    const inc = css`
        ${fontS18}
        color: ${colors.success}
    `;
    const dec = css`
        ${fontS18}
        color: ${colors.danger}
    `;
    const data = [
        {
            icon: <PaymentIcon />,
            state: 1,
            label: "Expenses",
            iconCSS: redIcon,
            bgOuter: "bg-orange-300",
            bgInner: "bg-orange-500",
        },
        {
            icon: <PaymentsOutlinedIcon />,
            state: 0,
            label: "Savings",
            iconCSS: purpleIcon,
            bgOuter: "bg-slate-300",
            bgInner: "bg-slate-700",
        },
        {
            icon: <TipsAndUpdatesOutlinedIcon />,
            state: 0,
            label: "Bills",
            iconCSS: greenIcon,
            bgOuter: "bg-indigo-300",
            bgInner: "bg-indigo-700",
        },
    ];
    return (
        <BlockContainer className="bg-white my-6 p-6">
            <div className="flex justify-between">
                <div>
                    <div className="font-medium font-base">Budget</div>
                    <div className="text-sm text-slate-500">Monthly budget summary</div>
                </div>
                <Fab css={morevert}>
                    <MoreVertIcon />
                </Fab>
            </div>
            <div className="text-sm mt-6 text-slate-600">
                Last month; you had <b>223</b> expense transactions, <b>12</b> savings entries and <b>4</b> bills.
            </div>
            <div className="mt-8 mb-3 flex flex-col gap-8">
                {data.map((elem, index) => (
                    <div className="flex items-center" key={index}>
                        <div className="rounded h-14 w-14 flex justify-center items-center" css={elem.iconCSS}>
                            {elem.icon}
                        </div>
                        <div className="grow mx-4">
                            <div>
                                <div className="text-xs text-slate-400">{elem.label}</div>
                                <div className="text-xl font-medium mt-0.5">$11,763.34</div>
                            </div>
                            <div className={"mt-2 relative rounded h-1 " + elem.bgOuter}>
                                <div className={"h-full absolute rounded w-3/4 " + elem.bgInner}></div>
                            </div>
                        </div>
                        <div className="self-end ml-4 flex items-center">
                            <span className="mr-2 text-lg">2.6%</span>
                            {elem.state ? <SouthIcon css={inc} /> : <NorthIcon css={dec} />}
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-xs text-slate-500 mt-3">Exceeded your personal limit! Be careful next month.</div>
            <Button css={transactionBtn} variant="outlined">
                Download Summary
            </Button>
        </BlockContainer>
    );
}

function Finance() {
    return (
        <div className="bg-color">
            <div
                className="flex justify-between px-8 pt-8 mb-8"
                css={css`
                    @media (max-width: 650px) {
                        flex-direction: column;
                        gap: 16px;
                        align-items: center;
                    }
                `}
            >
                <div>
                    <div className="font-medium text-2xl">Finance dashboard</div>
                    <div className="text-sm text-slate-500">Keep track of your financial status</div>
                </div>
                <div className="flex items-center gap-4">
                    <Fab variant="extended" css={btnCSS}>
                        <DescriptionOutlinedIcon className="font-s20" />
                        <span className="text-sm ml-2 capitalize">Reports</span>
                    </Fab>
                    <Fab variant="extended" css={btnCSS}>
                        <SettingsOutlinedIcon className="font-s20" />
                        <span className="text-sm ml-2 capitalize">Settings</span>
                    </Fab>
                    <Fab variant="extended" css={bgpurple}>
                        <SystemUpdateAltOutlinedIcon className="font-s20" />
                        <span className="text-sm ml-2 capitalize">Export</span>
                    </Fab>
                </div>
            </div>
            <div className="px-6 pb-6" css={bodyAnimation}>
                <Block1 />
                <BlockContainer className="mt-6 bg-white overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium">Account Balance</div>
                                <div className="text-sm text-slate-500">
                                    Monthly balance growth and avg. monthly income
                                </div>
                            </div>
                            <Chip label="12 months" className="text-xs" />
                        </div>
                        <div className="mt-6 flex gap-12">
                            <div>
                                <div className="text-4xl font-bold">38.33%</div>
                                <div className="text-slate-500 mt-2" css={fontS13}>
                                    Average Monthly Growth
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">$45,332.00</div>
                                <div className="text-slate-500 mt-2" css={fontS13}>
                                    Average Monthly Income
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={largeTrending} alt="img" className="w-full" />
                </BlockContainer>
                <BlockContainer className="bg-white p-6 mt-6">
                    <div className="mb-6">
                        <div className="font-medium font-base">Recent transactions</div>
                        <div className="text-sm text-slate-500">1 pending, 4 completed</div>
                    </div>
                    <TableBlock />
                    <hr />
                    <Button css={transactionBtn} variant="outlined">
                        See All Transaction
                    </Button>
                </BlockContainer>
                <RankDiv />
            </div>
        </div>
    );
}

export default Finance;
