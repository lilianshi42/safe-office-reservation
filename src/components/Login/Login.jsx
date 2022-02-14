import React from "react";
import { Form, Input, Button, Image } from "antd";
import "./Login.css";

function Login() {
  return (
    <div style={{ margin: "20px", padding: "15px" }}>
      <div className="login-logo" style={{ textAlign: "center", margin: "20px", padding: "15px" }}>
        <Image src="https://cdn-images-1.medium.com/max/1200/1*IOMogY9xupXEg_ndWOb_4A.png" alt="riot-logo" width={100} preview={false} />
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
          autoComplete="off">
          <Form.Item
            style={{ padding: "5px" }}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}>
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
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            style={{ textAlign: "center", padding: "5px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
