import {SolvedQuiz} from "../models/SolvedQuiz.ts";
import {useCallback} from "react";
import {Api} from "../Api.ts";

export const useSolveQuizCallback = () => {
    const api = new Api()

    return useCallback(
        async (quizId: number, solution: SolvedQuiz) => {
            return api.submitSolution(quizId, solution)
        },
        [api]
    );
};
