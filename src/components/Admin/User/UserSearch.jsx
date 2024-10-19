import { Button, Col, Form, Input, Row } from "antd";

const UserSearch = (props) => {
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: '#fff',
        borderRadius: '8px',
        padding: 24,

    };

    const onFinish = (values) => {
        let query = "";

        if (values.fullName) {
            query += `&fullName=/${values.fullName}/i`
        }
        if (values.email) {
            query += `&email=/${values.email}/i`
        }

        if (query) {
            props.handleSearch(query);
        }
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
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`email`}
                        label={`Email`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col
                    span={24}
                    style={{ textAlign: 'right' }}>
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
                            props.setFilter("");
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