/**@jsxImportSource @emotion/react */
import { css, keyframes } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
    avatar1,
    avatar10,
    avatar11,
    avatar2,
    avatar3,
    avatar4,
    avatar7,
    avatar5,
    avatar6,
} from "~/assets/imgs/avatars";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar } from "@mui/material";
import { floatUp } from "~/components/Animations";

const avatarCSS = css`
    width: 128px;
    margin: auto;
    height: 128px;
`;
const positionColor = css`
    color: #888;
`;
const bodyCSS = css`
    padding: 32px;
`;
const wrapperCSS = css`
    border-radius: 12px;
    box-shadow: 0 0 2px 1px #ddd;
`;
const btnCSS = css`
    flex-grow: 1;
    padding: 16px 0;
    margin: 0 !important;
    color: #333;
`;
const btnRightCSS = css`
    ${btnCSS}
    border-left: 1px solid #ddd;
`;
const gridCSS = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 261.5px);
    gap: 24px;
`;
const temp = css`
    animation: ${floatUp} 250ms ease-in-out;
`;

function TeamCard({ src }: { src: string }) {
    return (
        <Card sx={{ minWidth: 262 }} className="inline-block" css={wrapperCSS}>
            <CardContent css={bodyCSS}>
                <div>
                    <Avatar src={src} alt="photo" css={avatarCSS} />
                    <div className="mt-6 font-medium text-center">Best Blackburn</div>
                    <div css={positionColor} className="text-sm text-center">
                        Senior Developer
                    </div>
                </div>
            </CardContent>
            <CardActions
                css={css`
                    padding: 0;
                    border-top: 1px solid #ddd;
                `}
            >
                <Button css={btnCSS} size="small">
                    <EmailIcon className="font-s20" />
                    <span className="ml-2">Email</span>
                </Button>
                <Button css={btnRightCSS} size="small">
                    <CallIcon className="font-s20" />
                    <span className="ml-2">Call</span>
                </Button>
            </CardActions>
        </Card>
    );
}

function Team() {
    const avatars = [avatar1, avatar10, avatar11, avatar2, avatar3, avatar4, avatar7, avatar5, avatar6];
    return (
        <div css={temp}>
            <div css={gridCSS} className="justify-center">
                {avatars.map((elem, index) => (
                    <TeamCard key={index} src={elem} />
                ))}
            </div>
        </div>
    );
}

export default Team;
