import ForumIcon from "@mui/icons-material/Forum";
interface props {
    text: string;
    iconFont?: string;
    // textFont?: string;
}
function NoSelectedChat({ text, iconFont }: props) {
    return (
        <div className="grow p-6 h-full">
            <div className="h-full flex flex-col items-center justify-center">
                <ForumIcon style={{ fontSize: iconFont || "100px" }} className="opacity-50" />
                <div className="opacity-60 px-4 text-lg mt-6 text-center font-medium">{text}</div>
            </div>
        </div>
    );
}

export default NoSelectedChat;
