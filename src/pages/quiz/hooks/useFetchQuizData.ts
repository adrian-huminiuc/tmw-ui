import {useEffect, useState} from "react";
import {Api} from "../Api.ts";
import {Quiz} from "../models/Quiz.ts";
import {useLocation} from "react-router-dom";


export const useFetchQuizData = () => {
    const [data, setData] = useState(null as unknown as Quiz);
    const location = useLocation();

    const api = new Api();
    useEffect(() => {
        api.getRealData(location.pathname.split('/').pop() as string).then(res => {
            setData(res);
        }).catch(e => console.error(e))
    }, []);

    return data;
};
