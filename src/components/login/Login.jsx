import React, { useState } from "react";
import { Form, Input, Button, Image } from "antd";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "antd";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setError("");
      setLoading(true);
      await login(values.email, values.password);
      navigate("/");
    } catch (err) {
      setError("Failed to login, cannot find your email");
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: "20px", padding: "15px" }}>
      <div
        className="login-logo"
        style={{ textAlign: "center", margin: "20px", padding: "15px" }}
      >
        <Image
          src="https://cdn-images-1.medium.com/max/1200/1*IOMogY9xupXEg_ndWOb_4A.png"
          alt="riot-logo"
          width={100}
          preview={false}
        />
      </div>
      <div style={{ margin: "20px", padding: "15px" }}>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            style={{ padding: "5px" }}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ padding: "5px" }}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            style={{ textAlign: "center", padding: "5px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button type="primary" htmlType="submit" disabled={loading}>
              Login
            </Button>
            <div>
              First time use? <Link to="/sign-up">Sign Up</Link>
            </div>
            {error && <Alert message={error} type="warning" closable />}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
