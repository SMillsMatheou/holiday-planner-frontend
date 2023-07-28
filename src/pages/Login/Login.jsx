import { Form, Input, Button, Card, Row, Col } from "antd";
import { useAuth } from "../../contexts";
import { useApi } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser, csrfToken } = useAuth();
  const { login } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await csrfToken();
    const data = await login(values);
    if (data) {
      setUser(data.user);
      navigate("/profile");
    }
  };

  return (
    <>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col>
          <Card>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please inpuot your email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              {/* <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{ offset: 8, span: 16 }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item> */}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={() => navigate("/register")} type="link">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
