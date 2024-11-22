import './style.scss';
import MainContent from '../../components/MainContent';
import { Card, Col, Row } from 'antd';
import { FcApproval, FcGraduationCap } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { callListCourse, callListCourseDone } from '../../services/api';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';

const Learn = () => {
    const [listCourse, setListCourse] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        handListCourse();
    }, []);

    const handListCourse = async () => {
        setIsLoading(true);

        const res = await callListCourse();
        if (res && res.data) {
            setListCourse(res.data);
        }


        const resCompleted = await callListCourseDone();
        if (resCompleted && resCompleted.data) {
            setCompletedCourses(resCompleted.data.map((item) => item.course.id)); // lấy danh sách ID hoàn thành
        }

        setIsLoading(false);
    }

    const getCourseStyle = (courseId) => {
        // đổi màu nền
        if (completedCourses.includes(courseId)) {
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

    const handleRedirectBook = (course) => {
        navigate(`/learn/${course.id}`)
    }

    return (
        <MainContent>
            {isLoading && <Loading />}
            <Row gutter={[32, 32]} className="course-list">
                <Col span={24} style={{ padding: 0 }}>
                    <div className="rounded-card">
                        DANH SÁCH KHÓA HỌC
                    </div>
                </Col>
                {listCourse.map((course, index) => (
                    <Col span={24} key={index} style={{ padding: 0 }}>
                        <Card className="course-card" onClick={() => handleRedirectBook(course)} style={getCourseStyle(course.id)}>
                            <h3 className="course-title">{course.courseName}</h3>
                            <div className="course-description">
                                <FcApproval className="course-icon" />
                                <span>{course.courseTarget}</span>
                            </div>
                            <div className="course-description">
                                <FcGraduationCap className="course-icon" />
                                <span>{course.description}</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </MainContent >
    );
}

export default Learn;