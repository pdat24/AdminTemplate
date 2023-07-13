import Avatar from "@mui/material/Avatar";
import avatar1 from "~/assets/imgs/avatars/female-02.jpg";

export default function UserDiv({
    avatar,
    name,
    desc,
    time,
}: {
    avatar?: string;
    name?: string;
    desc?: string;
    time?: string;
}) {
    return (
        <div className="flex items-center py-2">
            <Avatar src={avatar || avatar1} />
            <div className="text-sm my-1.5 ml-3">
                <div className="whitespace-nowrap">
                    <span className="text-purple">{name || "Bernard Langley"}</span>
                    <span className="px-1">{desc || "started following you"}</span>
                </div>
                <div className="opacity-60">{time || "October 8, 2022"}</div>
            </div>
        </div>
    );
}
