import { Modal, Form, Input, Button, message, notification } from 'antd';
import { callChangePassword } from '../../services/api';

const ChangePassModal = ({ isVisible, onClose }) => {
    const [form] = Form.useForm();

    const handleChangePassword = async (values) => {
        const { oldPass, newPass } = values;

        const res = await callChangePassword(oldPass, newPass);

        if (res && res.data) {
            message.success('Đổi mật khẩu thành công');
            form.resetFields();
            onClose();
        }
        else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
    };

    const handleCloseModal = () => {
        form.resetFields(); // Reset dữ liệu trên form khi đóng modal
        onClose();
    };

    return (
        <Modal
            title="Đổi mật khẩu"
            open={isVisible}
            onOk={() => { form.submit() }}
            onCancel={handleCloseModal}
            maskClosable={false}
            okText={"Đổi mật khẩu"}
            cancelText={"Hủy"}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleChangePassword}
            >
                <Form.Item
                    name="oldPass"
                    label="Mật khẩu hiện tại"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="newPass"
                    label="Mật khẩu mới"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    dependencies={['newPass']}
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPass') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChangePassModal;
