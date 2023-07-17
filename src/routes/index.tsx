import {
    Chat,
    NotFoundPage,
    ProfilePage,
    ProjectPage,
    Contacts,
    FinancePage,
    Academic,
    Analytics,
    Crypto,
    Mail,
    Notes,
} from "~/pages";
import { useParams } from "react-router-dom";

function AppRouter() {
    const { id } = useParams();
    let Page = null;
    switch (id) {
        case "project":
            Page = ProjectPage;
            break;
        case "profile":
            Page = ProfilePage;
            break;
        case "finance":
            Page = FinancePage;
            break;
        case "academic":
            Page = Academic;
            break;
        case "analytics":
            Page = Analytics;
            break;
        case "crypto":
            Page = Crypto;
            break;
        case "contacts":
            Page = Contacts;
            break;
        case "chat":
            Page = Chat;
            break;
        case "mail":
            Page = Mail;
            break;
        case "notes":
            Page = Notes;
            break;
        default:
            Page = NotFoundPage;
    }
    return <Page />;
}

export default AppRouter;
