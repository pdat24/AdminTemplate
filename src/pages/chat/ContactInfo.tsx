/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import img from "~/assets/imgs/profile/first-snow-small.jpg";
import { Fab, Avatar } from "@mui/material";
import { resetFab } from "~/components/CSS";
import { friend } from "~/types";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef } from "react";

const header = css`
    height: 64px;
    padding: 24px 32px;
    background-color: rgb(246, 249, 251);
`;
const avatarLg = css`
    width: 160px;
    height: 160px;
`;
const stateColor = {
    on: "rgb(76, 175, 80)",
    off: "rgb(100, 100, 100)",
    pending: "rgb(255, 193, 7)",
};
function getState(type: "on" | "off" | "pending") {
    return css`
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid #fff;
        background-color: ${stateColor[type]};
    `;
}
const w400 = css`
    width: 400px;
    transition: margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;

function ContactInfo({ data, onToggle }: { data: friend; onToggle?: () => void }) {
    const wrapper = useRef<HTMLDivElement>(null);
    const handleClose = () => {
        if (onToggle) onToggle();
        else wrapper.current!.style.marginRight = "-400px";
    };

    useEffect(() => {
        window.addEventListener("chatroom/openrightside", () => {
            if (wrapper.current) wrapper.current.style.marginRight = "0px";
        });
    }, []);
    return (
        <div ref={wrapper} className="bg-white shrink-0 overflow-hidden" css={w400}>
            <div className="h-full overflow-auto flex flex-col pb-6">
                <div className="flex items-center border-b border-solid" css={header}>
                    <div onClick={handleClose}>
                        <Fab css={resetFab} style={{ width: "40px", height: "40px" }}>
                            <CloseIcon />
                        </Fab>
                    </div>
                    <div className="text-xl ml-4">Contact info</div>
                </div>
                <div className="text-center">
                    <div className="relative rounded-full w-fit mx-auto mt-8 mb-3">
                        <Avatar src={data.avatar} css={avatarLg} />
                        <div className="absolute indicator right-4 bottom-5" css={getState(data.state)}></div>
                    </div>
                    <h2 className="font-medium">{data.name}</h2>
                    <h3 className="opacity-70 text-sm">Hello! I'm a software engineer.</h3>
                </div>
                <div className="px-6 text">
                    <div className="mt-8">
                        <h2 className="mb-4">Media</h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <img src={img} alt="photo" className="rounded w-20" />
                            <img src={img} alt="photo" className="rounded w-20" />
                            <img src={img} alt="photo" className="rounded w-20" />
                            <img src={img} alt="photo" className="rounded w-20" />
                            <img src={img} alt="photo" className="rounded w-20" />
                            <img src={img} alt="photo" className="rounded w-20" />
                            <img src={img} alt="photo" className="rounded w-20" />
                            <img src={img} alt="photo" className="rounded w-20" />
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="mb-4 text-base">Detail</h2>
                        <div className="text-sm opacity-80">
                            <div>Emails</div>
                            <div>
                                mcleodwagner@mail.biz <span className="opacity-70 ml-2">• &nbsp; Personal</span>
                            </div>
                            <br />
                            <h3>Phone numbers</h3>
                            <p>
                                977 590 2773 <span className="opacity-70 ml-2">• &nbsp; Mobile</span>
                            </p>
                            <p>
                                828 496 3813 <span className="opacity-70 ml-2">• &nbsp; Work</span>
                            </p>
                            <p>
                                831 432 2512 <span className="opacity-70 ml-2">• &nbsp; Home</span>
                            </p>
                            <br />
                            <h3>Title</h3>
                            <br />
                            <h3>Company</h3>
                            <p>Inrt</p>
                            <br />
                            <h3>Birthday</h3>
                            <p>12/03/1980</p>
                            <br />
                            <h3>Address</h3>
                            <p>736 Glen Street, Kaka, West Virginia, PO9350</p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
