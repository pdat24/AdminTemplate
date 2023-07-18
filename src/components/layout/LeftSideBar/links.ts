import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
export default [
    { text: "Project", path: "/pages/project", icon: AssignmentTurnedInOutlinedIcon, group: 1 },
    { text: "Finance", path: "/pages/finance", icon: PaymentsOutlinedIcon, group: 1 },
    { text: "Analytics", path: "/pages/analytics", icon: BubbleChartOutlinedIcon, group: 1 },
    { text: "Crypto", path: "/pages/crypto", icon: MonetizationOnOutlinedIcon, group: 1 },
    { text: "Academic", path: "/pages/academic", icon: SchoolOutlinedIcon, group: 2 },
    { text: "Contacts", path: "/pages/contacts", icon: Groups2OutlinedIcon, group: 2 },
    { text: "Chat", path: "/pages/chat", icon: TextsmsOutlinedIcon, group: 2 },
    { text: "Mail", path: "/pages/mail", icon: MailOutlineOutlinedIcon, group: 2 },
    { text: "Notes", path: "/pages/notes", icon: EditNoteIcon, group: 2 },
    { text: "Profile", path: "/pages/profile", icon: AccountCircleOutlinedIcon, group: 2 },
];
