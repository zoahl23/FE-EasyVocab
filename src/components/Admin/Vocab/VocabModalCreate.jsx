import { Divider, Form, Input, message, Modal, notification, Select } from "antd";
import { callCreateAVocab, callFetchAllTopic } from "../../../services/api";
import { useEffect, useState } from "react";

const VocabModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [listTopic, setListTopic] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchTopic = async () => {
            const res = await callFetchAllTopic();
            if (res && res.data) {
                const topics = res.data.map(item => {
                    return { label: item.topicName, value: item.id }
                })
                setListTopic(topics);
            }
        }
        fetchTopic();
    }, []);

    const onFinish = async (values) => {
        const { word, meaning, topicId } = values;
        setIsSubmit(true)
        // console.log("value:", values);
        const res = await callCreateAVocab(word, meaning, topicId);
        // console.log("res:", res);
        if (res && res.data) {
            message.success('Tạo mới từ vựng thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchVocab();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Tách các dấu khỏi ký tự
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
            .replace(/đ/g, "d").replace(/Đ/g, "D"); // Chuyển 'đ' thành 'd'
    };

    return (
        <>
            <Modal
                title="Thêm mới từ vựng"
                open={openModalCreate}
                onOk={() => form.submit()}
                onCancel={() => {
                    setOpenModalCreate(false);
                    form.resetFields();
                }}
                maskClosable={false}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />
                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Từ vựng"
                        name="word"
                        rules={[{ required: true, message: 'Vui lòng nhập từ vựng!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Nghĩa của từ"
                        name="meaning"
                        rules={[{ required: true, message: 'Vui lòng nhập nghĩa của từ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Chọn chủ đề áp dụng"
                        name="topicId"
                    >
                        <Select
                            defaultValue={null} // ko chọn giá trị nào
                            showSearch // search
                            allowClear // clear
                            options={listTopic}
                            filterOption={(input, option) =>
                                removeVietnameseTones(option?.label ?? '')
                                    .toLowerCase()
                                    .includes(removeVietnameseTones(input.toLowerCase()))
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default VocabModalCreate;