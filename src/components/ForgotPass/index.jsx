import { Modal, Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { callSendOtp, callResetPassword } from '../../services/api';

const ForgotPass = ({ isVisible, onClose }) => {
    const [step, setStep] = useState(1); // Step 1: Nhập email, Step 2: Nhập OTP, Step 3: Đổi mật khẩu
    const [form] = Form.useForm();
    const [otpInfo, setOtpInfo] = useState(null);
    const [inputOtp, setInputOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (values) => {
        setLoading(true);
        const { email } = values;
        const res = await callSendOtp(email);
        if (res.data) {
            message.success("OTP đã được gửi đến email!");
            setOtpInfo(res.data);
            setStep(2);
        } else {
            message.error(res.message || "Gửi OTP thất bại!");
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        const currentTime = new Date();
        const expiryTime = new Date(otpInfo?.expiryTime);
        if (currentTime > expiryTime) {
            message.error("OTP đã hết hạn, vui lòng yêu cầu mã mới!");
        } else if (inputOtp === otpInfo?.otp) {
            message.success("OTP hợp lệ!");
            setStep(3);
        } else {
            message.error("OTP không hợp lệ, vui lòng thử lại!");
        }
    };

    const handleChangePassword = async (values) => {
        setLoading(true);
        const { newPassword } = values;
        const res = await callResetPassword(otpInfo.email, newPassword);
        if (res.data) {
            message.success("Đổi mật khẩu thành công!");
            onClose();
        } else {
            message.error(res.message || "Đổi mật khẩu thất bại!");
        }
        setLoading(false);
    };

    const handleClose = () => {
        setStep(1); // Reset về bước đầu tiên
        setOtpInfo(null); // Xóa dữ liệu OTP
        form.resetFields(); // Reset form
        onClose(); // Đóng modal
    };

    return (
        <Modal
            title="Quên mật khẩu"
            open={isVisible}
            onCancel={handleClose}
            footer={null}
            maskClosable={false}
            width={400}
            centered
        >
            {step === 1 && (
                <Form form={form} onFinish={handleSendOtp}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        style={{ marginTop: 20 }}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Gửi OTP
                    </Button>
                </Form>
            )}

            {step === 2 && (
                <Form form={form} onFinish={handleVerifyOtp}>
                    <Form.Item
                        label="Mã OTP"
                        name="otp"
                        rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
                        style={{ marginTop: 20 }}
                    >
                        <Input.OTP
                            length={6}
                            onChange={(text) => setInputOtp(text)}
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Xác thực
                    </Button>
                    <Button
                        type="link"
                        onClick={() => handleSendOtp({ email: otpInfo.email })}
                        block
                    >
                        Gửi lại OTP
                    </Button>
                </Form>
            )}

            {step === 3 && (
                <Form form={form} onFinish={handleChangePassword}>
                    <Form.Item
                        label="Mật khẩu"
                        name="newPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                        style={{ marginTop: 20 }}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận lại"
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
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Đổi mật khẩu
                    </Button>
                </Form>
            )}
        </Modal>
    );
};

export default ForgotPass;
