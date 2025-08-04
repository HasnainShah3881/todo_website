import React, { use, useContext, useEffect } from "react";
import { LockFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { DataContext } from "../../datacontext";

const LoginForm = () => {
  const [form] = Form.useForm(); // Create form instance
  const { openSignup, setopenSignup } = useContext(DataContext);
  const { openLogin, setopenLogin } = useContext(DataContext);
  const { User, setUser } = useContext(DataContext);

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    try {
      const res = await axios.post(
        "https://backend-for-todo-kappa.vercel.app//Auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        // toast.success("login successfully");
        form.resetFields();
        setopenLogin(false);
        setopenSignup(false);
        window.location.reload();
      }
      console.log("RESPONSE", res);
    } catch (error) {
      toast.error("invalid credential");
    }
  };

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360, width: 400 }}
      onFinish={onFinish}
    >
      {/* ✅ Email Field with Regex */}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address!",
          },
        ]}
      >
        <Flex justify="space-between" align="center">
          <Input
            prefix={<MailOutlined />}
            className="h-10 sm:h-12"
            type="email"
            placeholder="Email"
          />
        </Flex>
      </Form.Item>

      {/* ✅ Password Field with Regex */}
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          {
            pattern:
              /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
            message:
              "Password must be 8+ characters, include upper/lowercase, number, and special character.",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          className="h-10 sm:h-12"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or{" "}
        <a
          onClick={() => {
            setopenLogin(false);
            setopenSignup(true);
          }}
        >
          Register now!
        </a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
