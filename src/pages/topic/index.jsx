import { useNavigate, useParams } from "react-router-dom";
import MainContent from '../../components/MainContent';
import './style.scss';
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import LearningModal from "../../components/LearningModal";
import { callListTopic } from "../../services/api";
import Loading from "../../components/Loading";

const Topic = () => {
    const [isLearningMode, setIsLearningMode] = useState(false);
    const [listTopic, setListTopic] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [courseName, setCourseName] = useState();
    const navigate = useNavigate();

    const { id } = useParams(); // course id

    useEffect(() => {
        handListTopic();
    }, []);

    const handListTopic = async () => {
        setIsLoading(true);
        const res = await callListTopic(`id=${id}`);
        if (res && res.data) {
            setListTopic(res.data);
            setCourseName(res.data[0].course.courseName);
        }
        setIsLoading(false);
    }

    return (
        <>
            <MainContent>
                {isLoading && <Loading />}
                <Row gutter={[32, 32]} className="topic-list">
                    <Col span={24} style={{ padding: 0 }}>
                        <div
                            className="rounded-card"
                            onClick={() => {
                                navigate('/learn');
                            }}
                        >
                            {courseName}
                        </div>
                    </Col>
                    {listTopic.map((topic, index) => (
                        <Col span={24} key={index} style={{ padding: 0 }}>
                            <div
                                className="topic-card"
                                onClick={() => {
                                    setIsLearningMode(true)
                                }}
                            >
                                <div className="topic-card__image">
                                    <img src={topic.image} />
                                </div>
                                <div className="topic-card__content">
                                    <h3 className="topic-card__title">{topic.topicName}</h3>
                                    <p className="topic-card__description">{topic.description}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </MainContent>

            <LearningModal isVisible={isLearningMode} onClose={() => setIsLearningMode(false)} />
        </>
    )
}

export default Topic;
