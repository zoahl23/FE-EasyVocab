import { useEffect, useState } from 'react';
import { Divider, Form, Input, message, Modal, notification } from 'antd';
import { callUpdateCourse } from '../../../services/api';

const CourseModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { id, courseName, description, courseTarget } = values;
        //console.log("value: ", values);
        setIsSubmit(true)
        const res = await callUpdateCourse(id, courseName, description, courseTarget);
        //console.log(">>>check: ", res);
        if (res && res.data) {
            message.success('Cập nhật khóa học thành công');
            setOpenModalUpdate(false);
            await props.fetchCourse();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    return (
        <>
            <Modal
                title="Cập nhật khóa học"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
                maskClosable={false}
            >
                <Divider />
                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                // initialValues={dataUpdate}
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
                        label="Tên khóa học"
                        name="courseName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Mục tiêu"
                        name="courseTarget"
                        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Nội dung"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CourseModalUpdate;