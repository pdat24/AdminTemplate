import FullScreen from "./Fullscreen";
import BookMark from "./Bookmark";
import Notices from "./Notices";
import Search from "./Search";
import FormatSize from "./FormatSize";

export default function InteractingBtns() {
    return (
        <>
            <FormatSize />
            <FullScreen />
            <Search />
            <BookMark />
            <Notices />
        </>
    );
}
