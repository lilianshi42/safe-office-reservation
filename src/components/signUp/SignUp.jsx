import React, { useState } from "react";
import { Form, Input, Image, Button } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "antd";
import "./SignUp.css";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 1,
    },
    sm: {
      span: 6,
      offset: 9,
    },
  },
};

function SignUp() {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setError("");
      setLoading(true);
      await signUp(values.username, values.email, values.password);
      navigate("/home");
    } catch (err) {
      setError("Failed to create an account, please double check your information", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: "20px", padding: "15px" }}>
      <div className="login-logo" style={{ textAlign: "center", margin: "20px", padding: "15px" }}>
        <Image src="https://cdn-images-1.medium.com/max/1200/1*IOMogY9xupXEg_ndWOb_4A.png" alt="riot-logo" width={100} preview={false} />
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        scrollToFirstError>
        <Form.Item
          style={{ padding: "5px" }}
          name="username"
          label="User Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your user name!",
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          style={{ padding: "5px" }}
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          style={{ padding: "5px" }}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          style={{ padding: "5px" }}
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout} style={{ textAlign: "center", padding: "5px" }}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Sign Up
          </Button>
          <div>
            Already have an account? <Link to="/">Log in</Link>
          </div>
          {error && <Alert message={error} type="warning" closable />}
        </Form.Item>
      </Form>
      <div style={{ margin: "20px", padding: "15px" }}></div>
    </div>
  );
}

export default SignUp;
