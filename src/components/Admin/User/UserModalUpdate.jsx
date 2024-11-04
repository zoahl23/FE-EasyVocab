import { useEffect, useState } from 'react';
import { Divider, Form, Input, message, Modal, notification } from 'antd';
import { callUpdateUser } from '../../../services/api';

const UserModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { userId, fullName, role, paid } = values;
        //console.log("value: ", values);
        setIsSubmit(true)
        const res = await callUpdateUser(userId, fullName, 'admin', paid);
        //console.log(">>>check: ", res);
        if (res && res.data) {
            message.success('Cập nhật user thành công');
            setOpenModalUpdate(false);
            await props.fetchUser()
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
                title="Cập nhật người dùng"
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
                        name="userId"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        label="Role"
                        name="role"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        label="paid"
                        name="paid"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserModalUpdate;