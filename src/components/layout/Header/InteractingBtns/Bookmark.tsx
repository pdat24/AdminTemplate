/**@jsxImportSource @emotion/react */
import { useState } from "react";
import { Icon, iconCSS, z2000, fontS32 } from "./components";
import { children } from "~/types";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Switch from "@mui/material/Switch";
import CloudIcon from "@mui/icons-material/Cloud";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function BookMark() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const events = [
        { label: "Group Meeting", text: "In 32 Minutes, Room 1B" },
        { label: "Public Beta Release", text: "11:00 PM" },
        { label: "Dinner with David", text: "17:30 PM" },
        { label: "Q&A Session", text: "20:30 PM" },
    ];
    const notes = [
        { label: "Best songs to listen while working", text: "Last edit: May 8th, 2015" },
        { label: "Useful subreddits", text: "Last edit: January 12th, 2015" },
    ];
    const Label = ({ children }: children) => <h2 className="capitalize text-sm">{children}</h2>;
    const Noitce = ({ label, text }: { label: string; text: string }) => {
        return (
            <div>
                <Label>{label}</Label>
                <p className="opacity-60 text-sm">{text}</p>
            </div>
        );
    };
    const list = () => (
        <Box sx={{ width: 280 }} role="presentation">
            <List>
                <ListItem>
                    <Label>Today</Label>
                </ListItem>
                <div css={fontS32} className="py-6 px-4 opacity-60 font-medium ml-2 pb-0">
                    <div>Friday</div>
                    <div>
                        <span>8</span>
                        <span className="align-top text-base">th</span> October
                    </div>
                </div>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <Label>Events</Label>
                </ListItem>
                {events.map((elem) => (
                    <ListItem key={elem.label} className="mt-3">
                        <Noitce text={elem.text} label={elem.label} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem>
                    <Label>Notes</Label>
                </ListItem>
                {notes.map((elem) => (
                    <ListItem key={elem.label} className="mt-3">
                        <Noitce text={elem.text} label={elem.label} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem>
                    <Label>Quick Settings</Label>
                </ListItem>
                <div className="flex items-center w-full px-4 py-1 mt-3">
                    <NotificationsIcon className="font-s20 opacity-60" />
                    <div className="ml-4 grow">Notifications</div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center w-full px-4 py-1">
                    <CloudIcon className="font-s20 opacity-60" />
                    <div className="ml-4 grow">Cloud Sync</div>
                    <Switch />
                </div>
                <div className="flex items-center w-full px-4 py-1">
                    <Brightness7Icon className="font-s20 opacity-60" />
                    <div className="ml-4 grow">Retro Thrusters</div>
                    <Switch />
                </div>
            </List>
        </Box>
    );

    return (
        <>
            <span onClick={toggleDrawer}>
                <Icon>
                    <TurnedInNotIcon css={iconCSS} />
                </Icon>
            </span>
            <Drawer css={z2000} anchor="right" open={open} onClose={toggleDrawer}>
                {list()}
            </Drawer>
        </>
    );
}
