import { Divider, Form, Input, message, Modal, notification, Select } from "antd";
import { callFetchAllTopic, callUpdateVocab } from "../../../services/api";
import { useEffect, useState } from "react";

const VocabModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
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
        const { id, word, meaning, topicId } = values;
        setIsSubmit(true)
        // console.log("value:", values);
        const res = await callUpdateVocab(id, word, meaning, topicId);
        // console.log("res:", res);
        if (res && res.data) {
            message.success('Cập nhật từ vựng thành công');
            setOpenModalUpdate(false);
            await props.fetchVocab();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: 'Từ vựng không tồn tại'
            })
        }
        setIsSubmit(false)
    };

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                ...dataUpdate,
                topicId: dataUpdate.topic?.id,
            });
        }
    }, [dataUpdate])

    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD") // Tách các dấu khỏi ký tự
            .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
            .replace(/đ/g, "d").replace(/Đ/g, "D"); // Chuyển 'đ' thành 'd'
    };

    return (
        <>
            <Modal
                title="Cập nhật từ vựng"
                open={openModalUpdate}
                onOk={() => form.submit()}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                maskClosable={false}
                okText={"Cập nhật"}
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
                        hidden
                        labelCol={{ span: 24 }}
                        label="Id"
                        name="id"
                    >
                        <Input />
                    </Form.Item>
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

export default VocabModalUpdate;