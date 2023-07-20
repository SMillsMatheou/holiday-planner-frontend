import { Row, Col, Card, Form, Input, message, Button } from 'antd';
import { useApi } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { register } = useApi();
    const navigate = useNavigate();

    const handleSubmit = async (values) => { 
        const resp = await register({name: values.name, email: values.email, password: values.password, password_confirmation: values.confirm});
        console.log(resp);
        if(resp?.user) {
            message.success('New account created');
            navigate('/');
        }
    }

    return (
        <>
            <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col>
                    <Card>
                        <Form
                            name='off'
                            labelCol={{ span:  8 }}
                            onFinish={handleSubmit}
                            autoComplete='off'
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please inpuot your email!' }]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!'}]}
                            >
                                <Input placeholder="Name" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!'}]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                rules={[
                                    { required: true, message: 'Please confirm your password!'},
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if(!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('Passwords do not match!'));
                                        }
                                    })
                                ]}
                            >
                                <Input.Password placeholder="Confirm Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>

                            <Form.Item>
                                <p>Already have an account? <Button onClick={() => navigate('/')} type="link">Login here</Button></p>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}