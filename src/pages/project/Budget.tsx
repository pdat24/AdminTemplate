/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BlockContainer from "~/components/BlockContainer";
import greenTrending from "~/assets/imgs/greenTrending.svg";
import redTrending from "~/assets/imgs/redTrending.svg";
import purpleTrending from "~/assets/imgs/blueTrending.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fab, Chip } from "@mui/material";
import { resetFab } from "~/components/CSS";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import colors from "~/components/colors";
import projectChart3 from "~/assets/imgs/profile/projectChart3.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { floatUp } from "~/components/Animations";

const morevertCSS = css`
    ${resetFab}
    height: auto;
    width: auto;
    padding: 6px;
    z-index: 1;
`;
const colorSuccess = css`
    color: ${colors.success};
`;
const colorErr = css`
    color: ${colors.danger};
`;
const nonTableSepLine = css`
    th,
    td {
        border-collapse: collapse;
        border: none;
    }
`;
const nonShadow = css`
    box-shadow: none;
`;
const fontS12 = css`
    font-size: 12px !important;
`;

const wrapperCSS = css`
    animation: ${floatUp} 250ms ease-in-out;
`;

function TableBlock() {
    const createData = (
        type: string,
        totalBudget: string,
        expensesUSD: string,
        expensesPerc: string,
        remainingUSD: string,
        remainingPerc: string
    ) => {
        return { type, totalBudget, expensesUSD, expensesPerc, remainingUSD, remainingPerc };
    };

    const rows = [
        createData("Concept", "14,880.00", "14,880.00", "96.69", "14,880.00", "96.69"),
        createData("Design", "14,880.00", "14,880.00", "96.69", "14,880.00", "96.69"),
        createData("Development", "14,880.00", "14,880.00", "96.69", "14,880.00", "96.69"),
        createData("Extras", "14,880.00", "14,880.00", "96.69", "14,880.00", "96.69"),
        createData("Marketing", "14,880.00", "14,880.00", "96.69", "14,880.00", "96.69"),
    ];
    return (
        <TableContainer component={Paper} css={nonShadow}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell css={fontS12}>Type</TableCell>
                        <TableCell css={fontS12} align="left">
                            Total Budget
                        </TableCell>
                        <TableCell css={fontS12} align="left">
                            Expenses (USD)
                        </TableCell>
                        <TableCell css={fontS12} align="left">
                            Expenses (%)
                        </TableCell>
                        <TableCell css={fontS12} align="left">
                            Remaining (USD)
                        </TableCell>
                        <TableCell css={fontS12} align="left">
                            Remaining (%)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="mt-2">
                    {rows.map((row) => (
                        <TableRow key={row.type} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Chip label={row.type} />
                            </TableCell>
                            <TableCell align="left">${row.totalBudget}</TableCell>
                            <TableCell align="left">${row.expensesUSD}</TableCell>
                            <TableCell align="left">{row.expensesPerc}%</TableCell>
                            <TableCell align="left">${row.remainingUSD}</TableCell>
                            <TableCell align="left">{row.remainingPerc}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function AnalyticBlock() {
    const data = [
        { label: "Weekly Expenses", money: "17,663.00", chart: purpleTrending, state: 1 },
        { label: "Monthly Expenses", money: "54,663.00", chart: greenTrending, state: 0 },
        { label: "Yearly Expenses", money: "648,813.00", chart: redTrending, state: 0 },
    ];
    const grow2 = css`
        flex-grow: 2;
    `;
    return (
        <div
            className="flex gap-6"
            css={css`
                @media (max-width: 1200px) {
                    flex-direction: column;
                }
            `}
        >
            <BlockContainer
                className="shrink basis-0 bg-white flex items-center justify-center"
                css={css`
                    ${grow2}
                    @media (max-width: 1200px) {
                        flex: 1;
                    }
                `}
            >
                <img src={projectChart3} alt="chart" className="no-drag" />
            </BlockContainer>
            <div className="grow shrink basis-0 font-medium flex flex-col gap-6">
                {data.map((elem, index) => (
                    <BlockContainer className="p-6 bg-white" key={index}>
                        <div className="flex justify-between items-center">
                            <div>{elem.label}</div>
                            <Fab css={morevertCSS}>
                                <MoreVertIcon />
                            </Fab>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <div>
                                <div className="flex items-center">
                                    <EuroOutlinedIcon />
                                    <span className="text-2xl font-bold">{elem.money}</span>
                                </div>
                                <div className="text-xs">
                                    <span css={elem.state ? colorSuccess : colorErr}>
                                        {elem.state ? (
                                            <TrendingUpIcon className="font-s20" />
                                        ) : (
                                            <TrendingDownIcon className="font-s20" />
                                        )}
                                        &nbsp;2%
                                    </span>
                                    <span>&nbsp;{elem.state ? "above" : "below"} projected</span>
                                </div>
                            </div>
                            <img src={elem.chart} alt="a photo" />
                        </div>
                    </BlockContainer>
                ))}
            </div>
        </div>
    );
}

function Budget() {
    return (
        <div css={wrapperCSS}>
            <AnalyticBlock />
            <BlockContainer className="bg-white p-6 mt-6">
                <div className="font-medium">Budget Details</div>
                <div css={nonTableSepLine}>
                    <TableBlock />
                </div>
            </BlockContainer>
        </div>
    );
}

export default Budget;
