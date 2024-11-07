import { Divider, Form, Input, message, Modal, notification } from "antd";
import { callCreateACourse } from "../../../services/api";
import { useState } from "react";

const CourseModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { courseName, description, courseTarget } = values;
        setIsSubmit(true)
        // console.log("value:", values);
        const res = await callCreateACourse(courseName, description, courseTarget);
        // console.log("res:", res);
        if (res && res.data) {
            message.success('Tạo mới khóa học thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchUser()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    return (
        <>
            <Modal
                title="Thêm mới khóa học"
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
                        label="Tên khóa học"
                        name="courseName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Mục tiêu khóa học"
                        name="courseTarget"
                        rules={[{ required: true, message: 'Vui lòng nhập mục tiêu khóa học!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Nội dung khóa học"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung khóa học!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CourseModalCreate;