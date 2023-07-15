/**@jsxImportSource @emotion/react */
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useState } from "react";
import { Tooltip } from "@mui/material";
import { iconCSS, Icon } from "./components";

export default function FullScreen() {
    const elem = document.documentElement;
    const [fs, setFs] = useState(false);
    const openFullscreen = () => {
        setFs(true);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    };
    function closeFullscreen() {
        setFs(false);
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
    }
    return (
        <Tooltip title="Fullscreen Toggle" placement="bottom" arrow>
            <div className="inline-block" onClick={fs ? closeFullscreen : openFullscreen}>
                <Icon>
                    <FullscreenIcon css={iconCSS} />
                </Icon>
            </div>
        </Tooltip>
    );
}
