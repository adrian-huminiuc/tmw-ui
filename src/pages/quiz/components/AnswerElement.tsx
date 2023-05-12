import {Tag} from "antd";
import {SolvedQuiz} from "../models/SolvedQuiz.ts";
import {Answer} from "../models/Answer.ts";
import {Question} from "../models/Question.ts";

function AnswerElement({answer, answerIdx, currentQuestion, solvedQuiz, answerQuestion}: {
    answer: Answer,
    answerIdx: number,
    currentQuestion: Question,
    solvedQuiz: SolvedQuiz,
    answerQuestion: (questionId: string, answerId: string) => void
}) {
    const isAnswerSelected = (currentAnswer: Answer) => solvedQuiz[currentQuestion.id] === currentAnswer.id;

    return (
        <div tabIndex={-1} className={isAnswerSelected(answer) ? 'quiz__selected_answer' : 'quiz__answer'}
             onClick={() => answerQuestion(currentQuestion.id, answer.id)}>
            <Tag
                color={isAnswerSelected(answer) ? 'gray' : 'black'}>{String.fromCharCode(97 + answerIdx)}</Tag>
            <span role={`answer-text-${answer.id}`}>{answer.text}</span>
        </div>
    );
}

export default AnswerElement;
