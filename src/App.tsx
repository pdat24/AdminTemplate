/**@jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages";
import { Navigate } from "react-router-dom";
import AppRouter from "./routes";
import DefaultLayout from "./components/layout/default.layout";

const wrapperCSS = css`
    overflow: auto;
    height: calc(100vh - 64px);
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-thumb {
        background: #eee;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
            background: #ddd;
        }
    }
`;

function App() {
    return (
        <DefaultLayout>
            <div css={wrapperCSS}>
                <Routes>
                    <Route path="/" element={<Navigate to={"/project"} />} />
                    <Route path="/:id" element={<AppRouter />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </DefaultLayout>
    );
}

export default App;
