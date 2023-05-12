import {Quiz} from "./models/Quiz.ts";
import {SolvedQuiz} from "./models/SolvedQuiz.ts";

export class Api {
    async getRealData(quizName: string): Promise<Quiz> {
        return (await fetch(`http://127.0.0.1:3099/quiz/${quizName}`)).json();
    }

    async submitSolution(quizId: number, solvedQuiz: SolvedQuiz): Promise<{ quiz: number; outcome: string }> {
        return (await fetch(`http://127.0.0.1:3099/quiz-solution/${quizId}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(solvedQuiz)
        })).json();
    }
}
