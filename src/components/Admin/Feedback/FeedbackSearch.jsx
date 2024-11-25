import { Button, Col, Form, Input, Row, Select } from "antd";

const FeedbackSearch = (props) => {
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

        if (values.email) {
            query += `&email=${removeVietnameseTones(values.email)}`
        }

        if (values.type) {
            query += `&type=${removeVietnameseTones(values.type)}`
        }

        if (values.status) {
            query += `&status=${removeVietnameseTones(values.status)}`
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
                        name={`email`}
                        label={`Email`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`type`}
                        label={`Loại phản hồi`}
                    >
                        <Select
                            defaultValue={null} // ko chọn giá trị nào
                            showSearch // search
                            allowClear // clear
                            options={[
                                { value: "0", label: "Audio" },
                                { value: "1", label: "Từ tiếng Anh" },
                                { value: "2", label: "Nghĩa tiếng Việt" },
                                { value: "3", label: "Phiên âm" },
                                { value: "4", label: "Câu ví dụ tiếng Anh" },
                                { value: "5", label: "Câu ví dụ tiếng Việt" },
                                { value: "6", label: "Vấn đề khác" },
                            ]}
                            filterOption={(input, option) =>
                                removeVietnameseTones(option?.label ?? '')
                                    .toLowerCase()
                                    .includes(removeVietnameseTones(input.toLowerCase()))
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`status`}
                        label={`Trạng thái phản hồi`}
                    >
                        <Select
                            defaultValue={null} // ko chọn giá trị nào
                            showSearch // search
                            allowClear // clear
                            options={[
                                { value: "0", label: "Chờ xử lý" },
                                { value: "1", label: "Đang xử lý" },
                                { value: "2", label: "Đã xử lý" },
                                { value: "3", label: "Từ chối" },
                            ]}
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

export default FeedbackSearch;