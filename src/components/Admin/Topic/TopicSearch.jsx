import { Button, Col, Form, Input, Row, Select } from "antd";

const TopicSearch = () => {
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: '#fff',
        borderRadius: '8px',
        padding: 24,
    };

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
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
                        name={`fullName`}
                        label={`Tên chủ đề (Tiếng Việt)`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`email`}
                        label={`Tên chủ đề (Tiếng Anh)`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`role`}
                        label={`Khóa học`}
                    >
                        <Select
                            showSearch
                        >
                            <Select.Option value="ROLE_ADMIN">IELTS</Select.Option>
                            <Select.Option value="ROLE_USER">TOEIC</Select.Option>
                            <Select.Option value="ROLE_USER">VSTEP</Select.Option>
                        </Select>
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