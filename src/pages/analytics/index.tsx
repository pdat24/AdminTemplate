/**@jsxImportSource @emotion/react */
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BlockContainer from "~/components/BlockContainer";
import { Chip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { css } from "@emotion/react";
import CustomBtn from "~/components/CustomButton";
import chartlg2 from "~/assets/imgs/chartlg2.svg";
import chartlg1 from "~/assets/imgs/chartlg1.svg";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import colors from "~/components/colors";
import { useState } from "react";
import purpleChart from "~/assets/imgs/purpleChart.svg";
import orangeChart from "~/assets/imgs/orangeChart.svg";
import greenChart from "~/assets/imgs/greenChart.svg";
import blueChart from "~/assets/imgs/blueChart.svg";
import smGreenChart from "~/assets/imgs/smGreenChart.svg";
import smPurpleChart from "~/assets/imgs/smPurpleChart.svg";
import smRedChart from "~/assets/imgs/smRedChart.svg";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const exportBtnCSS = css`
    background-color: #4f46e5;
    &:hover {
        background-color: rgb(55, 48, 163) !important;
    }
    color: #fff;
`;
const fontS16 = css`
    font-size: 16px;
`;
const colorSucc = css`
    color: ${colors.success};
`;
const colorErr = css`
    color: ${colors.danger};
`;

function Block1() {
    const [active, setActive] = useState(1);
    const wrapperCSS = css`
        background-color: rgb(30, 41, 59);
    `;
    const activeBtn = css`
        background-color: #374252;
        &:hover {
            background: #374252;
        }
    `;
    return (
        <BlockContainer className="bg-white" css={wrapperCSS}>
            <div className="flex justify-between px-8 pt-8 text-white">
                <div>
                    <div className="font-medium text-2xl">Visitors Overview</div>
                    <div className="text-sm text-slate-400">Number of unique visitors</div>
                </div>
                <div className="flex items-center gap-4">
                    <div onClick={() => setActive(1)}>
                        <CustomBtn css={active === 1 && activeBtn}>
                            <span className="text-sm ml-2 capitalize text-slate-300">This Year</span>
                        </CustomBtn>
                    </div>
                    <div onClick={() => setActive(2)}>
                        <CustomBtn css={active === 2 && activeBtn}>
                            <span className="text-sm ml-2 capitalize text-slate-300">Last Year</span>
                        </CustomBtn>
                    </div>
                </div>
            </div>
            <img src={chartlg1} alt="img" className="w-full no-drag" />
        </BlockContainer>
    );
}

function Block2() {
    const wrapperCSS = css`
        display: flex;
        flex-wrap: wrap;
        gap: 32px;
    `;
    const data = [
        { label: "Conversions", amount: "2,004", chart: smPurpleChart },
        { label: "Impressions", amount: "2,508", chart: smGreenChart },
        { label: "Visits", amount: "62,083", chart: smRedChart },
    ];
    return (
        <div css={wrapperCSS} className="mt-8">
            {data.map((elem, index) => (
                <BlockContainer
                    className="bg-white"
                    key={index}
                    css={css`
                        @media (max-width: 1500px) {
                            width: 100%;
                        }
                        @media (min-width: 1201px) {
                            flex: 1;
                        }
                    `}
                >
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-between">
                            <div className="font-medium">{elem.label}</div>
                            <Chip label="30 days" css={chipCSS} />
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="text-5xl font-bold">{elem.amount}</div>
                            <div className="flex gap-1 items-end">
                                <div css={colorErr} className="font-bold">
                                    <TrendingDownIcon css={fontS16} />
                                    <div>2%</div>
                                </div>
                                <div>below target</div>
                            </div>
                        </div>
                    </div>
                    <img src={elem.chart} alt="photo" className="no-drag w-full" />
                </BlockContainer>
            ))}
        </div>
    );
}

function Block3() {
    const data = [
        { label: "Overall Score", percent: "472%", state: 1 },
        { label: "Average Ratio", percent: "25%", state: 0 },
        { label: "Predicted Ratio", percent: "10%", state: 1 },
    ];
    return (
        <BlockContainer className="mt-8 bg-white overflow-hidden">
            <div className="p-6 pb-0">
                <div className="flex justify-between items-center">
                    <div className="font-medium">Visitors vs. Page Views</div>
                    <Chip label="30 days" className="text-xs" />
                </div>
                <div className="mt-6 flex gap-12">
                    {data.map((elem, index) => (
                        <div key={index}>
                            <div className="text-slate-600 mb-1 text-sm font-medium flex items-center gap-1">
                                <span>{elem.label}</span>
                                <InfoIcon className="opacity-50" css={fontS16} />
                            </div>
                            <div className="text-3xl font-bold flex">
                                <span>{elem.percent}</span>
                                <div className="flex gap-1 ml-2" css={elem.state ? colorSucc : colorErr}>
                                    {!!elem.state && <ArrowCircleUpIcon css={fontS16} />}
                                    {!elem.state && <ArrowCircleDownIcon css={fontS16} />}
                                    <span className="text-xs">22.2%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <img src={chartlg2} alt="img" className="w-full no-drag" />
        </BlockContainer>
    );
}

const chipCSS = css`
    height: auto;
    padding: 4px 0;
`;

function Block4() {
    const wrapperCSS = css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(254px, 1fr));
        justify-content: center;
        gap: 32px;
    `;
    const data = [
        { label: "New vs. Returning", chart: blueChart },
        { label: "Gender", chart: greenChart },
        { label: "Age", chart: purpleChart },
        { label: "Language", chart: orangeChart },
    ];
    return (
        <div css={wrapperCSS} className="mt-8">
            {data.map((elem, index) => (
                <BlockContainer className="bg-white p-6" key={index}>
                    <div className="flex items-center justify-between">
                        <div>{elem.label}</div>
                        <Chip label="30 days" css={chipCSS} />
                    </div>
                    <div className="my-6">
                        <img src={elem.chart} alt="photo" className="mx-auto no-drag" />
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full w-2 h-2 bg-slate-400"></div>
                                <span>New</span>
                            </div>
                            <div>36,868</div>
                            <div>80%</div>
                        </div>
                        <hr className="my-3" />
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full w-2 h-2 bg-slate-400"></div>
                                <span>Old</span>
                            </div>
                            <div>36,868</div>
                            <div>80%</div>
                        </div>
                    </div>
                </BlockContainer>
            ))}
        </div>
    );
}

function Analytics() {
    return (
        <div className="bg-color">
            <div className="flex justify-between px-8 pt-8">
                <div>
                    <div className="font-medium text-2xl">Analytics dashboard</div>
                    <div className="text-sm text-slate-500">Monitor metrics, check reports and review performance</div>
                </div>
                <div className="flex items-center gap-4">
                    <CustomBtn>
                        <SettingsOutlinedIcon className="font-s20" />
                        <span className="text-sm ml-2 capitalize">Settings</span>
                    </CustomBtn>
                    <CustomBtn css_={exportBtnCSS}>
                        <SystemUpdateAltOutlinedIcon className="font-s20" />
                        <span className="text-sm ml-2 capitalize">Export</span>
                    </CustomBtn>
                </div>
            </div>
            <div className="p-8">
                <Block1 />
                <Block2 />
                <Block3 />
                <Block4 />
            </div>
        </div>
    );
}

export default Analytics;
