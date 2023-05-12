import imgUrl from '../../assets/quiz.jpg'
import {Button, Space} from "antd";
import {Link} from "react-router-dom";
import './IndexPage.scss'

function IndexPage() {
    return (
        <section className='index_page'>
            <Space direction="vertical" style={{width: '100%'}}>
                <h1> Try our personality quiz </h1>
                <img src={imgUrl} alt="personality quiz" className='index_page__img'/>
                <Link to={'/quiz/ie'}>
                    <Button type="primary" block size={"large"}>
                        START
                    </Button>
                </Link>
            </Space>

        </section>
    );
}

export default IndexPage;
