import {useEffect, useState} from "react";
import {Button, Col, Row, Steps} from "antd";
import {useFetchQuizData} from "./hooks/useFetchQuizData.ts";
import './QuizPage.scss';
import {Question} from "./models/Question.ts";
import AnswerElement from "./components/AnswerElement.tsx";
import {SolvedQuiz} from "./models/SolvedQuiz.ts";
import {useSolveQuizCallback} from "./hooks/useSolveQuizCallback.ts";
import Title from "antd/lib/typography/Title";
import OutcomeElement from "./components/OutcomeElement.tsx";

function QuizPage() {
    const data = useFetchQuizData();
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(null as unknown as Question);
    const [solvedQuiz, setSolvedQuiz] = useState({} as SolvedQuiz);
    const [canShowPreviousQuestion, setCanShowPreviousQuestion] = useState(false);
    const [canShowNextQuestion, setCanShowNextQuestion] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [outcome, setOutcome] = useState('');
    const solveQuiz = useSolveQuizCallback()
    const isQuestionAnswered = (question: Question) => !!solvedQuiz[question.id];

    const answerQuestion = (questionId: string, answerId: string) => {
        const sqCopy = {...solvedQuiz};
        sqCopy[questionId] = answerId;
        setSolvedQuiz(sqCopy);
    }

    useEffect(() => {
        if (!currentQuestion) {
            return
        }
        setCanShowPreviousQuestion(currentQuestionIndex > 1);
        setCanShowNextQuestion(currentQuestionIndex < data.questions.length && !!solvedQuiz[currentQuestion.id])
        setCanSubmit(currentQuestionIndex === data.questions.length && Object.keys(solvedQuiz).length === data.questions.length);
    }, [currentQuestion, solvedQuiz]);

    useEffect(() => {
        if (!data) {
            return
        }
        setCurrentQuestion(data.questions[currentQuestionIndex - 1]);
        setLoading(false);
    }, [data, currentQuestionIndex, solvedQuiz]);

    return (
        <>
            {loading && <div>Loading ...</div>}
            {!loading && data && currentQuestion && !outcome &&
                <>
                    <Title level={2} role="quiz-description">{data.description}</Title>
                    <p> Question: {currentQuestionIndex} / {data?.questions.length ?? -1} </p>

                    <Row>
                        <Col xs={0} md={24}>
                            <Steps
                                size={data.questions.length > 10 ? 'small' : 'default'}
                                current={currentQuestionIndex - 1}
                                percent={isQuestionAnswered(currentQuestion) ? 100 : 0}
                                items={data.questions.map(() => ({title: undefined}))}/>
                            <h2 style={{height: 65}}>{currentQuestion.text}</h2>
                        </Col>
                    </Row>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: '60%'
                    }}>
                        <div className={'quiz__answer__container'}>
                            {currentQuestion.answers.map((it, answerIdx) => (
                                <Row key={currentQuestion.id + '-' + it.id}>
                                    <Col span={24}>
                                        <AnswerElement
                                            key={currentQuestion.id + '-' + it.id}
                                            answer={it}
                                            answerIdx={answerIdx}
                                            currentQuestion={currentQuestion}
                                            solvedQuiz={solvedQuiz}
                                            answerQuestion={answerQuestion}/>
                                    </Col>
                                </Row>
                            ))}
                        </div>

                        <Row>
                            <Col span={11}>
                                <Button
                                    block
                                    disabled={!canShowPreviousQuestion}
                                    type={"default"}
                                    size={"large"}
                                    style={{marginTop: 25, color: "gray"}}
                                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}> Previous </Button>
                            </Col>
                            <Col span={1}></Col>
                            {!canSubmit && (
                                <Col span={12}>
                                    <Button
                                        block
                                        key={currentQuestion.id}
                                        type={"primary"}
                                        disabled={!canShowNextQuestion}
                                        size={"large"}
                                        style={{marginTop: 25}}
                                        onKeyDown={(e) => {
                                            e.key === 'Enter' ? setCurrentQuestionIndex(currentQuestionIndex + 1) : null
                                        }}
                                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}> Next </Button>
                                </Col>
                            )}
                            {canSubmit && (
                                <Col span={12}>
                                    <Button
                                        block
                                        key={currentQuestion.id}
                                        type={"primary"}
                                        size={"large"}
                                        style={{marginTop: 25}}
                                        onClick={() => solveQuiz(data.id, solvedQuiz).then(it => setOutcome(it.outcome))}> Submit </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                </>
            }
            {!loading && outcome && (<OutcomeElement outcome={outcome} quizId={data.id} quizName={data.name}/>)}
        </>
    );
}

export default QuizPage;
