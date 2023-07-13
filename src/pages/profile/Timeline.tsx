/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import UserDiv from "~/components/UserBlock";
import { resetFab } from "~/components/CSS";
import BlockContainer from "~/components/BlockContainer";
import Avatar from "@mui/material/Avatar";
import avatar1 from "~/assets/imgs/avatars/female-03.jpg";
import avatar2 from "~/assets/imgs/avatars/female-04.jpg";
import avatar3 from "~/assets/imgs/avatars/female-02.jpg";
import CustomBtn from "~/components/CustomButton";
import Fab from "@mui/material/Fab";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import img1 from "~/assets/imgs/profile/14-640x480.jpg";
import img2 from "~/assets/imgs/profile/36-640x480.jpg";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";

const wrapperCSS = css`
    width: 1024px;
`;
const seeAll = css`
    padding: 4px 12px;
`;
const textareaCSS = css`
    height: 100px;
    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 4px;
    }
`;
const postBtn = css`
    padding: 6px 20px;
    color: #fff;
`;
const fabBtn = css`
    ${resetFab}
    width: auto;
    height: auto;
    padding: 10px;
    opacity: 0.6;
`;
const footerBg = css`
    background-color: rgb(246, 249, 251) !important;
`;

function LeftSide() {
    return (
        <BlockContainer className="w-80 bg-white mr-8 shrink-0 h-fit">
            <div className="py-6 px-8">
                <div className="overflow-hidden">
                    <div className="flex pb-4 justify-between items-center">
                        <div className="text-xl font-medium">Latest Activity</div>
                        <CustomBtn css_={seeAll} className="text-xs font-medium opacity-80">
                            See All
                        </CustomBtn>
                    </div>
                    <div>
                        {(() => {
                            const res = [];
                            for (let i = 1; i <= 8; i++) {
                                res.push(<UserDiv key={i} />);
                            }
                            return res;
                        })()}
                    </div>
                </div>
            </div>
        </BlockContainer>
    );
}

function Right1() {
    return (
        <BlockContainer>
            <div>
                <div className="p-6 text-sm bg-white">
                    <textarea
                        css={textareaCSS}
                        className="w-full block outline-0 border-0 resize-none bg-transparent"
                        placeholder="Write something..."
                    ></textarea>
                </div>
                <div
                    css={footerBg}
                    className="px-6 py-3 flex justify-between items-center bg-color border-t border-solid"
                >
                    <div className="pl-2">
                        <Fab css={fabBtn}>
                            <InsertPhotoIcon className="font-s20" />
                        </Fab>
                        <Fab css={fabBtn}>
                            <PersonIcon className="font-s20" />
                        </Fab>
                        <Fab css={fabBtn}>
                            <PlaceIcon className="font-s20" />
                        </Fab>
                    </div>
                    <CustomBtn css_={postBtn} className="text-sm bg-darkPurple">
                        Post
                    </CustomBtn>
                </div>
            </div>
        </BlockContainer>
    );
}

type iteractBtn = { num: number };
function LikeBtn({ num }: iteractBtn) {
    return (
        <CustomBtn className="text-sm opacity-70">
            <FavoriteBorderOutlinedIcon className="font-s20" />
            <span className="ml-1">Like ({num})</span>
        </CustomBtn>
    );
}
function ShareBtn({ num }: iteractBtn) {
    return (
        <CustomBtn className="text-sm opacity-70">
            <ShareOutlinedIcon className="font-s20" />
            <span className="ml-1">Share ({num})</span>
        </CustomBtn>
    );
}

function AddCommentBlock() {
    return (
        <div>
            <div className="flex justify-start mt-4">
                <Avatar />
                <div className="bg-white p-2 border border-solid border-slate-300 rounded-2xl grow ml-3 h-24">
                    <textarea
                        className="block w-full h-full text-sm outline-0 border-0 resize-none"
                        placeholder="Add a comment..."
                    ></textarea>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <CustomBtn css_={postBtn} className="text-sm bg-darkPurple">
                    Post comment
                </CustomBtn>
            </div>
        </div>
    );
}

function UserCommentBlock() {
    return (
        <div>
            <div className="flex justify-start mt-4 items-center">
                <Avatar src={avatar1} />
                <div className="ml-3">
                    <div>
                        <span className="text-darkPurple text-sm">Alice Freeman </span>
                        <span className="text-xs font-medium opacity-80">June 10, 2015</span>
                    </div>
                    <div className="opacity-70 text-sm">
                        That’s a wonderful place. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
                        eleifend ligula. Fusce posuere in sapien ac facilisis. Etiam sit amet justo non felis ornare
                        feugiat.
                    </div>
                </div>
            </div>
            <div className="ml-10">
                <CustomBtn>
                    <span className="mr-1">Reply</span>
                    <ReplyOutlinedIcon className="font-s20" />
                </CustomBtn>
            </div>
        </div>
    );
}

function Post1() {
    return (
        <BlockContainer className="mt-8">
            <div className="pt-6 px-8 pb-4 bg-white">
                <div className="flex justify-between">
                    <UserDiv desc="posted on your timeline" />
                    <Fab css={resetFab}>
                        <MoreVertOutlinedIcon />
                    </Fab>
                </div>
                <div className="mt-4">
                    <div className="mb-4 opacity-80">
                        Remember the place we were talking about the other night? Found it!
                    </div>
                    <img src={img1} alt="photo" className="rounded-xl" />
                </div>
                <div className="flex mt-3">
                    <LikeBtn num={24} />
                    <ShareBtn num={258} />
                </div>
            </div>
            <div css={footerBg} className="bg-color py-6 px-8 border-t border-solid">
                <div className="mb-4 text-sm opacity-80">
                    <span>1 comments </span>
                    <KeyboardArrowDownOutlinedIcon className="font-s20" />
                </div>
                <UserCommentBlock />
                <AddCommentBlock />
            </div>
        </BlockContainer>
    );
}

function Post2() {
    return (
        <BlockContainer className="mt-8">
            <div className="pt-6 px-8 pb-4 bg-white">
                <div className="flex justify-between">
                    <UserDiv desc="shared an article with you" avatar={avatar2} name="Andrew Green" />
                    <Fab css={resetFab}>
                        <MoreVertOutlinedIcon />
                    </Fab>
                </div>
                <div className="mt-4">
                    <div className="mb-4 opacity-80">Hey, man! Check this, it’s pretty awesome!</div>
                    <div className="rounded-xl overflow-hidden border border-solid">
                        <img src={img2} alt="photo" />
                        <div className="p-4">
                            <div>
                                <div>Never stop changing!</div>
                                <div className="text-xs mt-2">John Westrock</div>
                            </div>
                            <div className="text-sm mt-4">
                                John Westrock's new photo album called 'Never stop changing' is published! It features
                                more than 200 photos that will take you right in.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-3">
                    <LikeBtn num={104} />
                    <ShareBtn num={58} />
                </div>
            </div>
            <div css={footerBg} className="bg-color py-6 px-8 border-t border-solid">
                <div className="mb-4 text-sm opacity-80">
                    <span>1 comments </span>
                    <KeyboardArrowDownOutlinedIcon className="font-s20" />
                </div>
                <UserCommentBlock />
                <AddCommentBlock />
            </div>
        </BlockContainer>
    );
}

function Post3() {
    return (
        <BlockContainer className="mt-8">
            <div className="pt-6 px-8 pb-4 bg-white">
                <div className="flex justify-between">
                    <UserDiv avatar={avatar3} name="Carl Henderson" desc="shared something with you" />
                    <Fab css={resetFab}>
                        <MoreVertOutlinedIcon />
                    </Fab>
                </div>
                <div className="my-4 opacity-80 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et eleifend ligula. Fusce posuere in
                    sapien ac facilisis. Etiam sit amet justo non felis ornare feugiat. Aenean lorem ex, ultrices sit
                    amet ligula sed...
                </div>
                <div className="flex mt-10">
                    <LikeBtn num={24} />
                    <ShareBtn num={258} />
                </div>
            </div>
            <div css={footerBg} className="bg-color py-6 px-8 border-t border-solid">
                <AddCommentBlock />
            </div>
        </BlockContainer>
    );
}

function RightSide() {
    return (
        <div className="grow">
            <Right1 />
            <Post1 />
            <Post2 />
            <Post3 />
        </div>
    );
}

// main
export default function Timeline() {
    return (
        <div css={wrapperCSS} className="p-8 mx-auto">
            <div className="flex">
                <LeftSide />
                <RightSide />
            </div>
        </div>
    );
}
