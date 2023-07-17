/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { typeValids } from "./types";
import CustomBtn from "~/components/CustomButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { children } from "~/types";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { red, purple, blue, green } from "@mui/material/colors";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { useState, Dispatch, SetStateAction } from "react";
import MailBanner from "./MailBanner";
import { createContext, useContext } from "react";
const w288 = css`
    width: 288px;
    &::-webkit-scrollbar-thumb {
        background-color: #eee;
    }
`;
const addBtn = css`
    color: #fff;
    width: 100%;
    padding: 8px 12px;
    &:active {
        background-color: rgb(79, 70, 229) !important;
    }
`;

const Context = createContext<[string, Dispatch<SetStateAction<string>>] | []>([]);

const CustomLink = ({ children, onSetType, label }: children & { onSetType?: () => void; label: string }) => {
    const [active, setActive] = useContext(Context);
    const linkCSS = css`
        background-color: transparent;
        user-select: none;
        vertical-align: middle;
        appearance: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        min-height: 44px;
        width: 100%;
        border-radius: 6px;
        margin: 0px 0px 4px;
        padding: 10px 16px;
        color: #333;
        align-items: flex-end;
        cursor: pointer;
        font-size: 14px;
        gap: 16px;
        opacity: 0.7;
        &:hover {
            background-color: rgba(0, 0, 0, 0.05) !important;
            opacity: 1;
        }
    `;
    const handleClick = () => {
        onSetType && onSetType();
        setActive && setActive(label);
    };
    return (
        <h3
            onClick={handleClick}
            css={linkCSS}
            style={active === label ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : {}}
        >
            {children}
        </h3>
    );
};
function Label({ children }: { children: string }) {
    return <h2 className="text-darkPurple uppercase py-2.5 px-7 font-s13 font-bold">{children}</h2>;
}

function Mail() {
    const [type, setType] = useState<typeValids>("inbox");
    const [active, setActive] = useState<string>("inbox");
    const group1 = [
        { Icon: AllInboxIcon, label: "inbox", onSetType: () => setType("inbox") },
        { Icon: SendOutlinedIcon, label: "sent", onSetType: () => setType("sent") },
        { Icon: TextSnippetOutlinedIcon, label: "drafts", onSetType: () => setType("draft") },
        { Icon: WarningAmberRoundedIcon, label: "spam", onSetType: () => setType("spam") },
        { Icon: DeleteOutlineOutlinedIcon, label: "trash", onSetType: () => setType("trash") },
    ];
    const labels = [
        { color: blue[800], label: "Personal", onSetType: () => setType({ tags: ["personal"] }) },
        { color: purple[700], label: "Work", onSetType: () => setType({ tags: ["work"] }) },
        { color: red[700], label: "Payments", onSetType: () => setType({ tags: ["payments"] }) },
        { color: green[700], label: "Invoices", onSetType: () => setType({ tags: ["invoices"] }) },
        { color: purple[700], label: "Accounts", onSetType: () => setType({ tags: ["accounts"] }) },
        { color: green[700], label: "Forums", onSetType: () => setType({ tags: ["forums"] }) },
    ];
    return (
        <div className="h-full flex">
            <div className="h-full overflow-hidden shrink-0">
                <div css={w288} className="h-full overflow-auto bg-white border border-solid">
                    <div className="m-6 mt-10">
                        <div className="font-extrabold text-3xl mb-6">Mailbox</div>
                        <CustomBtn css={addBtn} className="bg-darkPurple">
                            <AddOutlinedIcon />
                            <span className="ml-2">Compose</span>
                        </CustomBtn>
                    </div>
                    <Context.Provider value={[active, setActive]}>
                        <div>
                            <div>
                                <Label>MAILBOXES</Label>
                                <div className="px-3 mb-6">
                                    {group1.map((Elem) => (
                                        <CustomLink key={Elem.label} label={Elem.label} onSetType={Elem.onSetType}>
                                            <Elem.Icon />
                                            <span className="font-medium capitalize">{Elem.label}</span>
                                        </CustomLink>
                                    ))}
                                </div>
                                <Label>Filters</Label>
                                <div className="px-3 mb-6">
                                    <CustomLink onSetType={() => setType("starred")} label="starred">
                                        <StarBorderOutlinedIcon />
                                        <span className="font-medium capitalize">Starred</span>
                                    </CustomLink>
                                    <CustomLink onSetType={() => setType("important")} label="important">
                                        <InfoOutlinedIcon />
                                        <span className="font-medium capitalize">important</span>
                                    </CustomLink>
                                </div>
                                <Label>Labels</Label>
                                <div className="px-3 mb-6">
                                    {labels.map((elem) => (
                                        <CustomLink key={elem.label} label={elem.label} onSetType={elem.onSetType}>
                                            <SellOutlinedIcon
                                                css={css`
                                                    color: ${elem.color};
                                                `}
                                            />
                                            <span className="font-medium capitalize">{elem.label}</span>
                                        </CustomLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Context.Provider>
                </div>
            </div>
            <MailBanner type={type} />
        </div>
    );
}

export default Mail;
