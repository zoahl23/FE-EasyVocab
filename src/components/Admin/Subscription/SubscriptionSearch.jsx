import { Button, Col, Form, Input, Row, Select } from "antd";

const SubscriptionSearch = (props) => {
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

        if (values.fullName) {
            query += `&fullName=${removeVietnameseTones(values.fullName)}`
        }

        if (values.email) {
            query += `&email=${removeVietnameseTones(values.email)}`
        }

        if (values.subscriptionPlan) {
            query += `&subscriptionPlan=${values.subscriptionPlan}`
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
                        name={`fullName`}
                        label={`Tên hiển thị`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`email`}
                        label={`Email`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`subscriptionPlan`}
                        label={`Gói dịch vụ đăng kí`}
                    >
                        <Select>
                            <Select.Option value="6_months">6 tháng</Select.Option>
                            <Select.Option value="1_year">1 năm</Select.Option>
                            <Select.Option value="3_years">3 năm</Select.Option>
                            <Select.Option value="none">Không</Select.Option>
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

export default SubscriptionSearch;