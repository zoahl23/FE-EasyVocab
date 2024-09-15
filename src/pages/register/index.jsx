import { Button, Divider, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './register.scss';

const RegisterPage = () => {

    const onFinish = (values) => {
        console.log(">>>> Check values: ", values);
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
                                label="Username"
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
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={false}
                                >
                                    Đăng ký
                                </Button>
                            </Form.Item>

                            <Divider>Or</Divider>
                            <p className="text text-normal">Bạn đã có tài khoản?</p>
                            <span><Link to='/login'>Đăng nhập</Link></span>
                        </Form>
                    </section>
                </div>
            </main>

        </div>
    )
}

export default RegisterPage;