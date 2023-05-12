import {useRouteError} from "react-router-dom";
import Menu from "../../layouts/MainLayout.tsx";

export default function ErrorPage() {
    const error = useRouteError() as { statusText: string; message: string };

    return (
        <Menu>
            <div id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </Menu>
    );
}
