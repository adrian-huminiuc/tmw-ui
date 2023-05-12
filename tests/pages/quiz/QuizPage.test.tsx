import {act, render, screen} from '@testing-library/react';
import QuizPage from "../../../src/pages/quiz/QuizPage";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import * as ApiModule from '../../../src/pages/quiz/Api'
import {Api} from '../../../src/pages/quiz/Api'
import {Quiz} from "../../../src/pages/quiz/models/Quiz";
import {exampleQuiz} from "../../stubs/quiz.example";


const dataPromise = Promise.resolve(exampleQuiz as Quiz);
vi.spyOn(ApiModule, 'Api').mockImplementation(() => {
    return {
        getRealData: () => dataPromise,
        submitSolution: () => Promise.resolve(null as { quiz: number; outcome: string; }),
    }
})

describe('QuizPage', () => {
    it('renders question + answers', async () => {
        render(<MemoryRouter><QuizPage/></MemoryRouter>);

        await act(async () => {
            await dataPromise
        })

        const description = screen.getByRole('quiz-description');
        expect(description.textContent).toEqual(exampleQuiz.description);

        const answer1 = screen.getByRole(`answer-text-${exampleQuiz.questions[0].answers[0].id}`);
        expect(answer1.textContent).toEqual(exampleQuiz.questions[0].answers[0].text);

        const answer2 = screen.getByRole(`answer-text-${exampleQuiz.questions[0].answers[1].id}`);
        expect(answer2.textContent).toEqual(exampleQuiz.questions[0].answers[1].text);
    });
});
