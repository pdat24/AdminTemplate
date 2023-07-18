/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomBtn from "~/components/CustomButton";
import Fab from "@mui/material/Fab";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import BlockContainer from "~/components/BlockContainer";
import av1 from "~/assets/imgs/avatars/male-01.jpg";
import av2 from "~/assets/imgs/avatars/female-02.jpg";
import av3 from "~/assets/imgs/avatars/female-03.jpg";
import av4 from "~/assets/imgs/avatars/female-06.jpg";
import av5 from "~/assets/imgs/avatars/male-06.jpg";
import av6 from "~/assets/imgs/avatars/male-05.jpg";
import { resetFab } from "~/components/CSS";
import UserDiv from "~/components/UserBlock";

const fontS22 = css`
    font-size: 22px;
`;

function Title({ children }: { children: string }) {
    return (
        <h2 className="font-medium capitalize" css={fontS22}>
            {children}
        </h2>
    );
}

function ContentBlock({ label, content }: { label: string; content: string[] }) {
    return (
        <div className="my-5">
            <h2 className="capitalize font-medium">{label}</h2>
            <div
                className="text-sm opacity-80"
                css={css`
                    line-height: 21px;
                `}
            >
                {content.map((elem, index) => (
                    <p key={index}>{elem}</p>
                ))}
            </div>
        </div>
    );
}

function About() {
    const w1024 = css`
        max-width: 1024px;
        width: 100% !important;
    `;
    const temp = css`
        padding: 2px 8px;
        font-size: 12px;
    `;
    return (
        <div className="bg-color">
            <div
                className="p-8 mx-auto flex"
                css={css`
                    ${w1024}
                    @media (max-width: 1200px) {
                        flex-direction: column;
                        width: 100%;
                    }
                `}
            >
                <div
                    className="mr-8"
                    css={css`
                        @media (max-width: 1200px) {
                            margin: 0;
                        }
                    `}
                >
                    <BlockContainer className="p-8 bg-white">
                        <Title>General Information</Title>
                        <ContentBlock label="gender" content={["Male"]} />
                        <ContentBlock label="Birthday" content={["October 8th, 2004"]} />
                        <ContentBlock label="Locations" content={["London, UK", "New York, USA"]} />
                        <ContentBlock
                            label="About Me"
                            content={[
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget pharetra felis, sed ullamcorper dui. Sed et elementum neque. Vestibulum pellente viverra ultrices. Etiam justo augue, vehicula ac gravida a, interdum sit amet nisl. Integer vitae nisi id nibh dictum mollis in vitae tortor.",
                            ]}
                        />
                    </BlockContainer>
                    <BlockContainer className="mt-8 p-8 bg-white">
                        <Title>Work</Title>
                        <ContentBlock label="Occupation" content={["Developer"]} />
                        <ContentBlock
                            label="Skills"
                            content={["C#, .Net, Cloud, Javascript, ReactJS, HTML, CSS, NodeJS"]}
                        />
                        <ContentBlock label="Locations" content={["London, UK", "New York, USA"]} />
                        <ContentBlock label="Jobs" content={["Self-Employed", "Google"]} />
                    </BlockContainer>
                    <BlockContainer className="mt-8 p-8 bg-white">
                        <Title>Contact</Title>
                        <ContentBlock
                            label="Address"
                            content={[
                                "Ut pharetra luctus est quis sodales. Duis nisi tortor, bibendum eget tincidunt, aliquam ac elit. Mauris nec euismod odio.",
                            ]}
                        />
                        <ContentBlock label="Tel" content={["+84 555 6600", "+82 618 6920"]} />
                        <ContentBlock label="Website" content={["withinpixel.com"]} />
                        <ContentBlock label="Emails" content={["mail@withinpixels.com", "mail@creapond.com"]} />
                    </BlockContainer>
                </div>
                <div
                    className="shrink-0"
                    css={css`
                        width: auto;
                        margin-top: 32px;
                        max-width: 960px;
                    `}
                >
                    <BlockContainer className="p-8">
                        <div className="flex justify-between mb-6 items-start">
                            <div className="text-xl font-medium">Friends</div>
                            <CustomBtn css={temp}>See 258 more</CustomBtn>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <img src={av5} className="rounded-xl h-16 w-16" alt="avt" />
                            <img src={av1} className="rounded-xl h-16 w-16" alt="avt" />
                            <img src={av2} className="rounded-xl h-16 w-16" alt="avt" />
                            <img src={av3} className="rounded-xl h-16 w-16" alt="avt" />
                            <img src={av4} className="rounded-xl h-16 w-16" alt="avt" />
                            <img src={av5} className="rounded-xl h-16 w-16" alt="avt" />
                            <img src={av6} className="rounded-xl h-16 w-16" alt="avt" />
                        </div>
                    </BlockContainer>
                    <BlockContainer className="p-8 mt-8">
                        <div className="flex justify-between mb-6 items-start">
                            <div className="text-xl font-medium">Joined Groups</div>
                            <CustomBtn css={temp}>See 6 more</CustomBtn>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <UserDiv avatar="as" name="Android" desc="Technology" time="1.856.546" />
                                <Fab css={resetFab}>
                                    <MoreVertOutlinedIcon />
                                </Fab>
                            </div>
                            <div className="flex items-center justify-between">
                                <UserDiv avatar="as" name="Android" desc="Technology" time="1.856.546" />
                                <Fab css={resetFab}>
                                    <MoreVertOutlinedIcon />
                                </Fab>
                            </div>
                            <div className="flex items-center justify-between">
                                <UserDiv avatar="as" name="Android" desc="Technology" time="1.856.546" />
                                <Fab css={resetFab}>
                                    <MoreVertOutlinedIcon />
                                </Fab>
                            </div>
                        </div>
                    </BlockContainer>
                </div>
            </div>
        </div>
    );
}

export default About;
