import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { callRegister } from '../../services/api';
import { useState } from 'react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        // console.log(">>>> Check values: ", values);
        const { username, email, password } = values;
        setIsSubmit(true);
        const res = await callRegister(username, email, password);
        setIsSubmit(false);
        // console.log(">>>> check res: ", res);
        if (res.data) {
            message.success("Đăng ký thành công!");
            navigate("/login");
        }
        else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,//JSON.stringify(res.message)
                duration: 5 // 5 seconds
            })
        }
    }

    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
                            <Divider />
                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tên người dùng"
                                name="username"
                                rules={[{ required: true, message: 'Tên không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmit}
                                >
                                    Đăng ký
                                </Button>
                            </Form.Item>

                            <Divider>Hoặc</Divider>
                            <p className="text text-normal">Bạn đã có tài khoản?
                                <span><Link to='/login'> Đăng nhập</Link></span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>

        </div>
    )
}

export default RegisterPage;