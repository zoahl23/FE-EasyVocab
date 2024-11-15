import { useParams } from "react-router-dom";
import MainContent from '../../components/MainContent';
import './style.scss';
import { Col, Row } from "antd";
import { useState } from "react";
import LearningModal from "../../components/LearningModal";

const Topic = () => {
    const [isLearningMode, setIsLearningMode] = useState(false);

    const { id } = useParams(); // course id

    console.log(">>> check book id: ", id)

    const topicList = [
        {
            title: "Economics",
            description: "1. Kinh tế học",
            coverImage: "https://storage.googleapis.com/download/storage/v1/b/quan-ly-sinh-vien-72421.appspot.com/o/1731169599903_ielts.png?generation=1731169600583514&alt=media",
        },
        {
            title: "Commerce P1",
            description: "2. Thương mại",
            coverImage: "https://storage.googleapis.com/download/storage/v1/b/quan-ly-sinh-vien-72421.appspot.com/o/1731169599903_ielts.png?generation=1731169600583514&alt=media",
        },
        {
            title: "Commerce P2",
            description: "3. Thương mại",
            coverImage: "https://storage.googleapis.com/download/storage/v1/b/quan-ly-sinh-vien-72421.appspot.com/o/1731169599903_ielts.png?generation=1731169600583514&alt=media",
        },
    ];

    return (
        <>
            <MainContent>
                <Row gutter={[32, 32]} className="topic-list">
                    <Col span={24} style={{ padding: 0 }}>
                        <div className="rounded-card">
                            1000 TỪ CƠ BẢN
                        </div>
                    </Col>
                    {topicList.map((topic, index) => (
                        <Col span={24} key={index} style={{ padding: 0 }}>
                            <div
                                className="topic-card"
                                onClick={() => {
                                    setIsLearningMode(true)
                                }}
                            >
                                <div className="topic-card__image">
                                    <img src={topic.coverImage} />
                                </div>
                                <div className="topic-card__content">
                                    <h3 className="topic-card__title">{topic.title}</h3>
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
