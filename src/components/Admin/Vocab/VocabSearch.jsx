import { Button, Cascader, Col, Form, Input, Row } from "antd";

const VocabSearch = () => {
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
                        name={`word`}
                        label={`Từ vựng`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`meaning`}
                        label={`Nghĩa tiếng việt`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`topicName`}
                        label={`Tên chủ đề`}
                    >
                        <Cascader
                            showSearch
                            options={[
                                {
                                    value: 'toeic',
                                    label: 'TOEIC',
                                    children: [
                                        {
                                            value: 'fruits',
                                            label: 'Fruits',
                                        },
                                    ],
                                },
                                {
                                    value: 'ielts',
                                    label: 'IELTS',
                                    children: [
                                        {
                                            value: 'fruits',
                                            label: 'Animals',
                                        },
                                        {
                                            value: 'toys',
                                            label: 'Toys',
                                        },
                                    ],
                                },
                            ]}
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
                        }}
                    >
                        Xóa
                    </Button>
                </Col>
            </Row>
        </Form >
    );
}

export default VocabSearch;