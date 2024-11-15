import './style.scss';
import MainContent from '../../components/MainContent';
import { Card, Col, Row } from 'antd';
import { FcApproval, FcGraduationCap } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const Learn = () => {

    const navigate = useNavigate();

    const courseList = [
        {
            id: 1,
            title: "PHRASAL VERB & IDIOM",
            description1: "Tăng khả năng vận dụng tiếng Anh",
            description2: "1400 Phrasal Verbs & Idioms thông dụng theo chủ đề",
        },
        {
            id: 2,
            title: "TIẾNG ANH CÔNG SỞ",
            description1: "Giao tiếp môi trường công sở",
            description2: "Từ vựng môi trường công sở",
        },
        {
            id: 3,
            title: "TIẾNG ANH CÔNG SỞ",
            description1: "Giao tiếp môi trường công sở",
            description2: "Từ vựng môi trường công sở",
        },
        {
            id: 4,
            title: "TIẾNG ANH CÔNG SỞ",
            description1: "Giao tiếp môi trường công sở",
            description2: "Từ vựng môi trường công sở",
        },
        {
            id: 5,
            title: "TIẾNG ANH CÔNG SỞ",
            description1: "Giao tiếp môi trường công sở",
            description2: "Từ vựng môi trường công sở",
        },
        {
            id: 6,
            title: "TIẾNG ANH CÔNG SỞ",
            description1: "Giao tiếp môi trường công sở",
            description2: "Từ vựng môi trường công sở",
        },
    ];

    const handleRedirectBook = (course) => {
        navigate(`/learn/${course.id}`)
    }

    return (
        <MainContent>
            <Row gutter={[32, 32]} className="course-list">
                <Col span={24} style={{ padding: 0 }}>
                    <div className="rounded-card">
                        DANH SÁCH KHÓA HỌC
                    </div>
                </Col>
                {courseList.map((course, index) => (
                    <Col span={24} key={index} style={{ padding: 0 }}>
                        <Card className="course-card" onClick={() => handleRedirectBook(course)}>
                            <h3 className="course-title">{course.title}</h3>
                            <div className="course-description">
                                <FcApproval className="course-icon" />
                                <span>{course.description1}</span>
                            </div>
                            <div className="course-description">
                                <FcGraduationCap className="course-icon" />
                                <span>{course.description2}</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </MainContent >
    );
}

export default Learn;