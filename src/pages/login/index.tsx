/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import avt from "~/assets/imgs/favicon.svg";
import { TextField, Checkbox, FormControlLabel, Fab, Avatar } from "@mui/material";
import { resetFab } from "~/components/CSS";
import CustomBtn from "~/components/CustomButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import avt2 from "~/assets/imgs/avatar.jpg";
import HeaderBg from "~/assets/imgs/academicHeaderBg.svg";
import { useState } from "react";
const z2000 = css`
    z-index: 2000;
`;
const wrapper = css`
    width: 320px;
`;
const btn = css`
    ${resetFab}
    width: 100%
`;
const inpt = css`
    input {
        padding: 15px;
        &::placeholder {
            font-size: 14px;
        }
    }
`;
const linkBtn = css`
    width: 100px;
    background-color: #eee;
`;
function Login() {
    const [pass, setPass] = useState("12345678");
    const [email, setEmail] = useState("admin62661@gmail.com");
    return (
        <div className="w-screen h-screen flex relative text-sm" css={z2000}>
            <div
                className="bg-white p-16 flex justify-end items-center"
                css={css`
                    width: 45%;
                `}
            >
                <div css={wrapper}>
                    <img src={avt} alt="photo" className="mb-4 h64" />
                    <div>
                        <h2 className="text-3xl font-bold  mb-1">Sign in</h2>
                        <div className="mb-6">
                            Don't have an account?{" "}
                            <a href="#" className="text-darkPurple">
                                Sign up
                            </a>
                        </div>
                    </div>
                    <div css={inpt}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            css={css`
                                input {
                                    font-size: 14px;
                                }
                            `}
                            variant="outlined"
                            className="w-full"
                            autoFocus
                        />
                    </div>
                    <div className="mt-6" css={inpt}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            className="w-full"
                            value={pass}
                            css={css`
                                input {
                                    font-size: 14px;
                                }
                            `}
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Remember me"
                            css={css`
                                span {
                                    font-size: 14px;
                                }
                            `}
                        />
                        <a className="text-darkPurple" href="#">
                            Forgot password?
                        </a>
                    </div>
                    <Fab
                        variant="extended"
                        className="font-medium bg-darkPurple w-full"
                        css={css`
                            ${btn}
                            &:active {
                                background-color: rgb(79, 70, 229) !important;
                            }
                        `}
                    >
                        <span className="text-white" onClick={() => (window.location.href = "/pages/analytics")}>
                            Sign in
                        </span>
                    </Fab>
                    <div className="flex items-center my-6">
                        <hr className="grow" />
                        <div className="mx-2 opacity-60">Or continue with</div>
                        <hr className="grow" />
                    </div>
                    <div className="flex justify-between">
                        <CustomBtn css={linkBtn}>
                            <FacebookOutlinedIcon />
                        </CustomBtn>
                        <CustomBtn css={linkBtn}>
                            <InstagramIcon />
                        </CustomBtn>
                        <CustomBtn css={linkBtn}>
                            <GitHubIcon />
                        </CustomBtn>
                    </div>
                </div>
            </div>
            <div
                className="relative flex items-center"
                css={css`
                    background-color: #1e293b;
                    width: 55%;
                `}
            >
                <div
                    className="text-white relative z-10 mx-16"
                    css={css`
                        width: 600px;
                    `}
                >
                    <div
                        className="font-bold text-4xl  opacity-70"
                        css={css`
                            font-size: 56px;
                            line-height: 56px;
                        `}
                    >
                        Welcome to our community
                    </div>
                    <div
                        className="my-6 text-base opacity-70"
                        css={css`
                            line-height: 22px;
                        `}
                    >
                        We helps developers to build organized and well coded dashboards full of beautiful and rich
                        modules. Join us and start building your application today.
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex">
                            <Avatar src={avt2} className="relative border-2 border-soild border-black -mr-1" />
                            <Avatar src={avt2} className="relative border-2 border-soild border-black -mr-1" />
                            <Avatar src={avt2} className="relative border-2 border-soild border-black -mr-1" />
                            <Avatar src={avt2} className="relative border-2 border-soild border-black -mr-1" />
                            <Avatar src={avt2} className="relative border-2 border-soild border-black" />
                        </div>
                        <div className=" opacity-70">More than 17k people joined us, it's your turn</div>
                    </div>
                </div>
                <div></div>
                <img src={HeaderBg} alt="photo" className="top-0 w-full h-full absolute" />
            </div>
        </div>
    );
}

export default Login;
