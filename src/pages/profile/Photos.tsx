/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import photo from "~/assets/imgs/profile/first-snow-small.jpg";

function Label({ time, num }: { time: string; num: string }) {
    return (
        <div className="flex opacity-60 items-center mb-6">
            <h2 className="font-medium text-2xl">{time}</h2>
            <div className="ml-4 text-sm">{num}</div>
        </div>
    );
}

function Photo({ img }: { img: string }) {
    const imgCSS = css`
        width: 220px;
        height: 220px;
    `;
    const textDivCSS = css`
        background: rgba(0, 0, 0, 0.5);
    `;
    return (
        <div className="relative rounded-xl overflow-hidden">
            <img src={img} alt="img" css={imgCSS} />
            <div
                className="flex justify-between items-center absolute w-full px-2 py-3 text-white bottom-0"
                css={textDivCSS}
            >
                <div>First Snow</div>
                <InfoOutlinedIcon className="font-S20" />
            </div>
        </div>
    );
}

function Photos() {
    const renderImg = (num: number) => {
        const res = [];
        for (let i = 0; i < num; i++) res.push(<Photo key={i} img={photo} />);
        return res;
    };
    return (
        <div className="bg-color">
            <div
                className="m-auto p-8"
                css={css`
                    max-width: 1024px;
                    width: 100%;
                    }
                `}
            >
                <div className="mb-12">
                    <Label time="July 2023" num="5 photos"></Label>
                    <div
                        className="flex gap-6 flex-wrap"
                        css={css`
                            @media (max-width: 1200px) {
                                justify-content: center;
                            }
                        `}
                    >
                        {renderImg(5)}
                    </div>
                </div>
                <div className="mb-12">
                    <Label time="May 2018" num="10 photos"></Label>
                    <div
                        className="flex gap-6 flex-wrap"
                        css={css`
                            @media (max-width: 1200px) {
                                justify-content: center;
                            }
                        `}
                    >
                        {renderImg(10)}
                    </div>
                </div>
                <div className="mb-12">
                    <Label time="April 2018" num="7 photos"></Label>
                    <div
                        className="flex gap-6 flex-wrap"
                        css={css`
                            @media (max-width: 1200px) {
                                justify-content: center;
                            }
                        `}
                    >
                        {renderImg(7)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Photos;
