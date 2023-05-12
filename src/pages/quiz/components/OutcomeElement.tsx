import {Button} from "antd";
import {Link} from "react-router-dom";

function OutcomeElement({outcome, quizName, quizId}: {
    outcome: string,
    quizName: string,
    quizId: number
}) {

    return (
        <>
            <section className={'quiz-outcome'}>

                <h1 style={{fontStyle: "italic"}}>Your result</h1>
                <div style={{
                    backgroundColor: "#dde3dde3",
                    width: '100%',
                    height: '9vh',
                    textAlign: "center",
                    borderRadius: 5

                }}>
                    <h2>{outcome}</h2>
                </div>

                <div style={{overflowY: "auto"}}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

                <div style={{height: '12vh'}}></div>

                <Link reloadDocument to={`/quiz/${quizName}`}
                      style={{width: '100%'}}>
                    <Button
                        block
                        key={quizId}
                        size={"large"}
                        type={"primary"}>
                        Retry
                    </Button>
                </Link>
            </section>
        </>
    );
}

export default OutcomeElement;
