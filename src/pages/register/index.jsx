import { Button, Divider, Form, Input } from 'antd';


const RegisterPage = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <>
            <div className="register-page" style={{ padding: '50px' }}>
                <h3 style={{ textAlign: 'center' }}>Tạo tài khoản mới</h3>
                <Divider />
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, margin: '0 auto' }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Fullname"
                        name="fullname"
                        rules={[{ required: true, message: 'Please input your fullname!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading="true">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default RegisterPage;