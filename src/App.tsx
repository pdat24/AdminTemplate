import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages";
import { Navigate } from "react-router-dom";
import AppRouter from "./routes";
import DefaultLayout from "./components/layout/default.layout";

function App() {
    return (
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<Navigate to={"/project"} />} />
                <Route path="/:id" element={<AppRouter />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </DefaultLayout>
    );
}

export default App;
