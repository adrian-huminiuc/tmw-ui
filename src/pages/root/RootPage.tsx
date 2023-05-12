import {Outlet} from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.tsx";

function RootPage() {
    return (
        <MainLayout>
            <Outlet/>
        </MainLayout>
    );
}

export default RootPage;
