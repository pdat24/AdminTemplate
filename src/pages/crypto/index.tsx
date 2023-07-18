/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import chart1 from "~/assets/imgs/crypto/chart1.svg";
import chart2 from "~/assets/imgs/crypto/chart2.svg";
import chart3 from "~/assets/imgs/crypto/chart3.svg";
import chart4 from "~/assets/imgs/crypto/chart4.svg";
import chart5 from "~/assets/imgs/crypto/chart5.svg";
import chart6 from "~/assets/imgs/crypto/chart6.svg";
import lgChart from "~/assets/imgs/crypto/lgChart.svg";
import NorthIcon from "@mui/icons-material/North";
import MenuIcon from "@mui/icons-material/Menu";
import SouthIcon from "@mui/icons-material/South";
import { colorSuccess, colorDanger } from "~/components/colors";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Box, Drawer } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import Button from "@mui/material/Button";

const textInpt14 = css`
    > div:first-of-type {
        font-size: 14px;
    }
`;
const borderNone = css`
    fieldset {
        border: none;
    }
`;
const labelCSS = css`
    ${borderNone}
    label {
        font-size: 14px;
        background-color: #f1f5f9;
    }
`;
const borderR20 = css`
    border-radius: 20px;
`;

function FormBlock() {
    const [action, setAction] = useState("buy");
    const [wallet, setWallet] = useState(1);
    const [currency, setCurrency] = useState("usd");
    const [amount, setAmount] = useState<number>(0);
    const $1USD = 0.00011263;
    const $1BTC = 8_878.48;
    const wallestList = [
        "Bitcoin Cash - 78.454412 BCH",
        "XRP - 11278.771123 XRP",
        "Ethereum - 126.3212 ETHH",
        "Bitcoin - 24.97311243 BTC",
    ];
    return (
        <div className="p-6">
            <FormControl fullWidth className="mt-6">
                <div className="text-sm opacity-60">Action *</div>
                <Select value={action} onChange={(e: SelectChangeEvent) => setAction(e.target.value)} css={textInpt14}>
                    <MenuItem value={"buy"}>Buy</MenuItem>
                    <MenuItem value={"sell"}>Sell</MenuItem>
                </Select>
            </FormControl>
            <div className="mt-6">
                <FormControl fullWidth>
                    <div className="text-sm opacity-70">Wallet *</div>
                    <Select
                        value={`${wallet}`}
                        onChange={(e: SelectChangeEvent) => setWallet(+e.target.value)}
                        css={textInpt14}
                    >
                        <MenuItem value={1}>{wallestList[0]}</MenuItem>
                        <MenuItem value={2}>{wallestList[1]}</MenuItem>
                        <MenuItem value={3}>{wallestList[2]}</MenuItem>
                        <MenuItem value={4}>{wallestList[3]}</MenuItem>
                    </Select>
                </FormControl>
                <div className="text-xs mt-1 ml-3 text-slate-500">{wallestList[wallet - 1]}</div>
            </div>
            <div className="mt-6">
                <div className="flex border border-solid rounded border-slate-400">
                    <TextField
                        value={amount || ""}
                        onChange={(e) => setAmount(+e.target.value)}
                        label="Amount"
                        variant="outlined"
                        type="number"
                        css={labelCSS}
                        required
                    />
                    <Select
                        value={currency}
                        onChange={(e: SelectChangeEvent) => setCurrency(e.target.value)}
                        css={borderNone}
                    >
                        <MenuItem value="usd">USD</MenuItem>
                        <MenuItem value="btc">BTC</MenuItem>
                    </Select>
                </div>
                <div className="text-xs mt-1 ml-3 text-slate-500">
                    {currency === "usd"
                        ? `You will receive: BTC ${$1BTC * amount}`
                        : `You will lost: $${$1USD * amount}`}
                </div>
            </div>
            <div className="mt-6">
                <Button className="w-full bg-darkPurple" css={borderR20} variant="contained">
                    {action.toUpperCase()}
                </Button>
            </div>
        </div>
    );
}

function Crypto() {
    const data = [
        { label: "Ethereum (ETH)", amount: "$170.46", chart: chart1, state: 1 },
        { label: "Bitcoin Cash(BCH)", amount: "$359.93", chart: chart2, state: 1 },
        { label: "XRP(XRP)", amount: "$0.24", chart: chart3, state: 0 },
        { label: "Litecoin(LTC)", amount: "$60.15", chart: chart4, state: 1 },
        { label: "Zcash(ZEC)", amount: "$58.41", chart: chart5, state: 0 },
        { label: "Bitcoin Gold(BTG)", amount: "$12.23", chart: chart6, state: 0 },
    ];
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const Temp = () => (
        <div className="w-80 border-r border-solid border-slate-200">
            <div>
                {data.map((elem, index) => (
                    <div className="p-5 flex bg-white border-b border-solid " key={index}>
                        <div className=" mr-4">
                            <div className="opacity-80 font-s13">{elem.label}</div>
                            <div className="flex mt-2 gap-2">
                                <div className="text-xl font-medium">{elem.amount}</div>
                                <div css={elem.state ? colorSuccess : colorDanger} className="font-medium">
                                    {!!elem.state && <NorthIcon className="font-s16" />}
                                    {!elem.state && <SouthIcon className="font-s16" />}
                                    <span className="text-xs">2.35%</span>
                                </div>
                            </div>
                        </div>
                        <img src={elem.chart} alt="photo" className="no-drag" />
                    </div>
                ))}
            </div>
            <FormBlock />
        </div>
    );
    return (
        <div className="bg-color flex">
            <div
                css={css`
                    @media (max-width: 850px) {
                        display: none;
                    }
                `}
            >
                <Temp />
            </div>
            <div
                css={css`
                    @media (max-width: 850px) {
                        width: 100%;
                    }
                `}
            >
                <div className="py-3 px-4 flex justify-between bg-white flex-wrap">
                    <div className="my-3 mx-2">
                        <div className="opacity-80 font-medium text-xl flex items-center">
                            <div>
                                <div onClick={toggleDrawer}>
                                    <MenuIcon
                                        className="font-s20 mr-2 cursor-pointer"
                                        css={css`
                                            display: none;
                                            @media (max-width: 850px) {
                                                display: inline-block;
                                            }
                                        `}
                                    />
                                </div>
                                <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                                    <Box
                                        sx={{
                                            backgroundColor: "#f1f5f9",
                                            overflowX: "hidden",
                                            minHeight: "100vh",
                                        }}
                                        role="presentation"
                                    >
                                        <div>
                                            <Temp />
                                        </div>
                                    </Box>
                                </Drawer>
                            </div>
                            <span>Bitcoin (BTC)M</span>
                        </div>
                        <div className="flex mt-2 gap-2">
                            <div className="text-2xl font-medium">$8,878.48</div>
                            <div css={colorSuccess} className="font-medium flex items-center">
                                <NorthIcon className="font-s20" />
                                <span>$0.24%</span>
                            </div>
                        </div>
                    </div>
                    <div className="my-3 mx-2 rounded-xl border border-solid border-slate-200 flex">
                        <div className="p-4">
                            <div className="opacity-60 text-xs">Market Cap</div>
                            <div className="font-medium">$148.75B</div>
                        </div>
                        <Divider orientation="vertical" />
                        <div className="p-4">
                            <div className="opacity-60 text-xs">Market Cap</div>
                            <div className="font-medium">$148.75B</div>
                        </div>
                        <Divider orientation="vertical" />
                        <div className="p-4">
                            <div className="opacity-60 text-xs">Market Cap</div>
                            <div className="font-medium">$148.75B</div>
                        </div>
                        <Divider orientation="vertical" />
                        <div className="p-4">
                            <div className="opacity-60 text-xs">Market Cap</div>
                            <div className="font-medium">$148.75B</div>
                        </div>
                    </div>
                </div>
                <img src={lgChart} alt="photo" className="no-drag" />d
            </div>
        </div>
    );
}

export default Crypto;
