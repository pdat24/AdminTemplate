/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MouseEvent, useState } from "react";
import BlockContainer from "~/components/BlockContainer";
import { Icon, iconCSS, z2000 } from "./components";
import Badge from "@mui/material/Badge";
import { children } from "~/types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Avatar from "@mui/material/Avatar";
import CustomBtn from "~/components/CustomButton";
import CloseIcon from "@mui/icons-material/Close";

const dismissBtn = css`
    font-size: 12px;
    padding: 4px 12px;
`;
const notificationCSS = css`
    min-height: 72px;
    transition: all 200ms ease-in-out;
`;
const contentCSS = css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
`;

function Notices() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const Label = ({ children }: children) => <h2 className="capitalize text-sm">{children}</h2>;
    const handleDismissAll = async () => {
        const targets = document.querySelectorAll(".notice");
        for (const target of targets) {
            target.style.transform = "translateX(100%)";
            setTimeout(() => {
                target.style.display = "none";
            }, 200);
            await new Promise((resolve) => setTimeout(resolve, 16));
        }
    };
    const handleDismiss = (e: MouseEvent<HTMLDivElement>) => {
        e.target.closest(".notice").style.transform = "translateX(100%)";
        setTimeout(() => {
            e.target.closest(".notice").style.display = "none";
        }, 200);
    };
    const Notification = ({ name, text }: { name: string; text: string }) => {
        return (
            <BlockContainer
                css_={notificationCSS}
                className="p-5 bg-white rounded-2xl relative flex justify-start my-3 items-center notice"
            >
                <Avatar />
                <div className="ml-4">
                    <Label>{name}</Label>
                    <p className="opacity-60 text-sm mr-2" css={contentCSS}>
                        {text}
                    </p>
                </div>
                <div className="absolute top-3 right-3 cursor-pointer" onClick={handleDismiss}>
                    <CloseIcon className="font-s20 " />
                </div>
            </BlockContainer>
        );
    };
    const list = () => (
        <Box
            sx={{ width: 320, backgroundColor: "#f1f5f9", padding: "16px", overflowX: "hidden", minHeight: "100vh" }}
            role="presentation"
        >
            <List>
                <div className="flex justify-between mt-32 items-center">
                    <div className="text-3xl font-medium">Notifications</div>
                    <div onClick={handleDismissAll}>
                        <CustomBtn css={dismissBtn} className="text-darkPurple">
                            Dismiss all
                        </CustomBtn>
                    </div>
                </div>
            </List>
            <div className="mt-8">
                <Notification name="Messager" text="Your Docker container is ready to publish" />
                <Notification name="Messager" text="Your submission has been accepted" />
                <Notification name="Messager" text="Your Vagrant container is ready to download" />
                <Notification name="Messager" text="sent you a direct message" />
                <Notification name="Messager" text="You have 3 new mails" />
                <Notification name="Messager" text="You have 15 unread mails across 3 mailboxe" />
            </div>
        </Box>
    );

    return (
        <>
            <span onClick={toggleDrawer}>
                <Icon>
                    <Badge color="primary" variant="dot">
                        <NotificationsNoneOutlinedIcon css={iconCSS} />
                    </Badge>
                </Icon>
            </span>
            <Drawer css={z2000} anchor="right" open={open} onClose={toggleDrawer}>
                {list()}
            </Drawer>
        </>
    );
}

export default Notices;
