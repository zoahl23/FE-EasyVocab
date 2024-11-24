import { Modal, Form, Input, Button, message } from 'antd';

const ChangePassModal = ({ isVisible, onClose }) => {
    const [form] = Form.useForm();

    const handleChangePassword = async () => {
        try {
            const values = await form.validateFields();
            console.log('Password change request:', values);

            // Call API đổi mật khẩu tại đây
            message.success('Đổi mật khẩu thành công');
            form.resetFields();
            onClose();
        } catch (error) {
            console.log('Validation failed:', error);
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
            onCancel={handleCloseModal}
            maskClosable={false}
            footer={[
                <Button key="cancel" onClick={handleCloseModal}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleChangePassword}>
                    Đổi mật khẩu
                </Button>,
            ]}
            centered
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="currentPassword"
                    label="Mật khẩu hiện tại"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu mới"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
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
