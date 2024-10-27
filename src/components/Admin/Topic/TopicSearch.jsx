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
                <Col span={10}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`topicName`}
                        label={`Topic Name`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`courseName`}
                        label={`Course Name`}
                    >
                        <Select>
                            <Select.Option value="demo">TOEIC</Select.Option>
                            <Select.Option value="demo">IELTS</Select.Option>
                            <Select.Option value="demo">VSTEP</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col
                    span={4}
                    style={{ textAlign: 'right', margin: '40px 0 0 0' }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: '#5B9BD5', borderColor: '#5B9BD5' }}
                    >
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 0 0 8px', backgroundColor: '#D3D3D3', borderColor: '#D3D3D3' }}
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
export default TopicSearch;