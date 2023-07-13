import { NotFoundPage, ProfilePage, ProjectPage, FinancePage, Academic, Analytics, Crypto } from "~/pages";
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
        default:
            Page = NotFoundPage;
    }
    return <Page />;
}

export default AppRouter;
