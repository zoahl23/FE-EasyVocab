import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { callFetchAllCourse } from "../../../services/api";

const TopicSearch = (props) => {
    const [listCourse, setListCourse] = useState([]);

    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: '#fff',
        borderRadius: '8px',
        padding: 24,
    };

    useEffect(() => {
        const fetchCourse = async () => {
            const res = await callFetchAllCourse();
            if (res && res.data) {
                const courses = res.data.map(item => {
                    return { label: item.courseName, value: item.id }
                })
                setListCourse(courses);
            }
        }
        fetchCourse();
    }, []);

    const onFinish = (values) => {
        // console.log("Received values of form: ", values);
        let query = "";

        if (values.topicName) {
            query += `&topicName=${values.topicName}`
        }

        if (values.description) {
            query += `&description=${removeVietnameseTones(values.description)}`
        }

        if (values.courseId) {
            query += `&id=${values.courseId}`
        }

        if (query) {
            props.handleSearch(query);
        }
    };

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Tách các dấu khỏi ký tự
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
            .replace(/đ/g, "d").replace(/Đ/g, "D"); // Chuyển 'đ' thành 'd'
    };

    return (
        <Form
            form={form}
            name="advanced-search"
            onFinish={onFinish}
            style={formStyle}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`topicName`}
                        label={`Tên chủ đề (Tiếng Anh)`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`description`}
                        label={`Tên chủ đề (Tiếng Việt)`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`courseId`}
                        label={`Khóa học`}
                    >
                        <Select
                            defaultValue={null} // ko chọn giá trị nào
                            showSearch // search
                            allowClear // clear
                            options={listCourse}
                            filterOption={(input, option) =>
                                removeVietnameseTones(option?.label ?? '')
                                    .toLowerCase()
                                    .includes(removeVietnameseTones(input.toLowerCase()))
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col
                    span={24}
                    style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Tìm kiếm
                    </Button>
                    <Button
                        style={{ margin: '0 0 0 8px' }}
                        onClick={() => {
                            form.resetFields();
                            props.setFilter("");
                        }}
                    >
                        Xóa
                    </Button>
                </Col>
            </Row>
        </Form >
    );
}

export default TopicSearch;