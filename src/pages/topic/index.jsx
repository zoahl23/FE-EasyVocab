import { useNavigate, useParams } from "react-router-dom";
import MainContent from '../../components/MainContent';
import './style.scss';
import { Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import LearningModal from "../../components/LearningModal";
import { callListTopic, callListTopicDone } from "../../services/api";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import AccountModal from "../../components/AccountModal/AccountModal";

const Topic = () => {
    const [isLearningMode, setIsLearningMode] = useState(false);
    const [listTopic, setListTopic] = useState([]);
    const [completedTopics, setCompletedTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [courseName, setCourseName] = useState();
    const [topicId, setTopicId] = useState();
    const navigate = useNavigate();

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isSubNotNone, setIsSubNotNone] = useState(false);

    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const subscriptionPlan = useSelector(state => state.account.user.subscriptionPlan);
    const user = useSelector((state) => state.account.user);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const { id } = useParams(); // course id

    useEffect(() => {
        handListTopic();
    }, [isLearningMode, topicId]);

    const handListTopic = async () => {
        setIsLoading(true);

        const res = await callListTopic(`id=${id}`);
        if (res && res.data) {
            setListTopic(res.data);
            setCourseName(res.data[0]?.course?.courseName);
        }

        const resCompleted = await callListTopicDone();
        if (resCompleted && resCompleted.data) {
            setCompletedTopics(resCompleted.data.map((item) => item.topic.id)); // lấy danh sách ID hoàn thành
        }

        setIsLoading(false);
    }

    const getTopicStyle = (topicId) => {
        // đổi màu nền
        if (completedTopics.includes(topicId)) {
            return {
                background: "linear-gradient(83.47deg, rgb(88, 204, 2) 9.02%, rgb(35, 172, 56) 90.81%)",
                color: "#fff",
            };
        }
        // nền mặc định
        return {
            background: "#f5f5f5",
            color: "#333",
        };
    };

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
                                className={`topic-card ${!isAuthenticated || subscriptionPlan === "none" && index >= 3 ? "disabled" : ""}`}
                                onClick={() => {
                                    if (isAuthenticated) {
                                        if (subscriptionPlan !== "none" || index < 3) {
                                            setIsLearningMode(true);
                                            setTopicId(topic.id);
                                        }
                                        else {
                                            setIsSubNotNone(true);
                                        }
                                    } else {
                                        setIsConfirmVisible(true);
                                    }
                                }}
                                style={getTopicStyle(topic.id)}
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
            </MainContent >

            <LearningModal
                isVisible={isLearningMode}
                onClose={() => setIsLearningMode(false)}
                topicId={topicId}
            />

            <Modal
                open={isConfirmVisible}
                onOk={() => {
                    setIsConfirmVisible(false);
                    navigate('/login');
                }}
                onCancel={() => setIsConfirmVisible(false)}
                cancelText="Hủy"
                okText="Đăng nhập"
                closeIcon={false}
                centered
                width={450}
                className="custom-confirm-modal"
            ><p>Đăng nhập để lưu kết quả học tập của bạn!</p></Modal>

            <Modal
                open={isSubNotNone}
                onOk={() => {
                    setIsSubNotNone(false);
                    setIsModalVisible(true);
                }}
                onCancel={() => setIsSubNotNone(false)}
                cancelText="Hủy"
                okText="Nâng cấp ngay"
                closeIcon={false}
                centered
                width={450}
                className="custom-confirm-modal"
            ><p>Nâng cấp tài khoản để mở khóa tất cả khóa học!</p></Modal>

            <AccountModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                userData={user}
            />
        </>
    )
}

export default Topic;
