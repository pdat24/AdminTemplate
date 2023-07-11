import { NotFoundPage, ProfilePage, ProjectPage } from "~/pages";
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
        default:
            Page = NotFoundPage;
    }
    return <Page />;
}

export default AppRouter;
