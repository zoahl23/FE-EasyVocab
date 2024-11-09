import { Button, Col, Form, Input, Row } from "antd";

const CourseSearch = (props) => {
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: '#fff',
        borderRadius: '8px',
        padding: 24,
    };

    const onFinish = (values) => {
        // console.log("Received values of form: ", values);
        let query = "";

        if (values.courseName) {
            query += `&courseName=${removeVietnameseTones(values.courseName)}`
        }

        if (values.courseTarget) {
            query += `&courseTarget=${removeVietnameseTones(values.courseTarget)}`
        }

        if (values.courseDescription) {
            query += `&description=${removeVietnameseTones(values.courseDescription)}`
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
                        name={`courseName`}
                        label={`Tên khóa học`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`courseTarget`}
                        label={`Mục tiêu khóa học`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`courseDescription`}
                        label={`Nội dung khóa học`}
                    >
                        <Input />
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

export default CourseSearch;