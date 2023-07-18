import { Login } from "./pages";
import { Outlet, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages";
import { Navigate } from "react-router-dom";
import AppRouter from "./routes";
import DefaultLayout from "./components/layout/default.layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
                path="/pages/"
                element={
                    <DefaultLayout>
                        <Outlet />
                    </DefaultLayout>
                }
            >
                <Route path=":id" element={<AppRouter />} />
            </Route>
        </Routes>
    );
}

export default App;
