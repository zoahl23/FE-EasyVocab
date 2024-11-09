import { Button, Cascader, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { callFetchAllTopic } from "../../../services/api";

const VocabSearch = (props) => {
    const [listTopic, setListTopic] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            const res = await callFetchAllTopic();
            if (res && res.data) {
                const topics = res.data.map(item => {
                    return { label: item.topicName, value: item.id }
                })
                setListTopic(topics);
            }
        }
        fetchCourse();
    }, []);

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Tách các dấu khỏi ký tự
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
            .replace(/đ/g, "d").replace(/Đ/g, "D"); // Chuyển 'đ' thành 'd'
    };

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

        if (values.word) {
            query += `&word=${removeVietnameseTones(values.word)}`
        }

        if (values.meaning) {
            query += `&meaning=${removeVietnameseTones(values.meaning)}`
        }

        if (values.topicId) {
            query += `&id=${values.topicId}`
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
                        name={`topicId`}
                        label={`Tên chủ đề`}
                    >
                        <Select
                            defaultValue={null}
                            showSearch
                            allowClear
                            options={listTopic}
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

export default VocabSearch;