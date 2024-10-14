import { Button, Col, Form, Input, Row } from "antd";

const UserSearch = () => {
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
                <Col span={12}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`fullName`}
                        label={`Name`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`email`}
                        label={`Email`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col
                    span={24}
                    style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 0 0 8px' }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form >
    );
}

export default UserSearch;