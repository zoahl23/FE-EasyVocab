import { useEffect, useState } from 'react';
import { Divider, Form, Input, message, Modal, notification, Select } from 'antd';
import { callUpdateUser } from '../../../services/api';

const SubModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { userId, fullName, role, subscriptionPlan } = values;
        //console.log("value: ", values);
        setIsSubmit(true)
        const res = await callUpdateUser(userId, fullName, role, subscriptionPlan);
        //console.log(">>>check: ", res);
        if (res && res.data) {
            message.success('Cập nhật gói đăng ký thành công');
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
                title="Cập nhật gói đăng ký"
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
                        hidden
                        labelCol={{ span: 24 }}
                        label="Tên hiển thị"
                        name="fullName"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Gói đăng ký"
                        name="subscriptionPlan"
                        rules={[{ required: true, message: 'Vui lòng chọn gói đăng ký!' }]}
                    >
                        <Select>
                            <Select.Option value="6_months">6 tháng</Select.Option>
                            <Select.Option value="1_year">1 năm</Select.Option>
                            <Select.Option value="3_years">3 năm</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        label="Phân loại"
                        name="role"
                    >
                        <Select>
                            <Select.Option value="ROLE_ADMIN">ADMIN</Select.Option>
                            <Select.Option value="ROLE_USER">USER</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SubModalUpdate;