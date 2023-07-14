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
                    {children}
                </div>
            </div>
            <RightSideBar />
        </main>
    );
}

export default DefaultLayout;
