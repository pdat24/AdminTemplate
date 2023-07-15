import { type children } from "~/types";
import LeftSideBar from "./LeftSideBar";
import Header from "./Header";
import RightSideBar from "./RightSideBar";

function DefaultLayout({ children }: children) {
    return (
        <main className="flex overflow-x-hidden">
            <div className="flex grow">
                <LeftSideBar />
                <div className="grow">
                    <Header />
                    <div className="relative z-10">{children}</div>
                </div>
            </div>
            <RightSideBar />
        </main>
    );
}

export default DefaultLayout;
