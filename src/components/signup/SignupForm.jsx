import React, { useContext, useEffect } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";
import axios from "axios";
import { NavLink } from "react-router";
import { DataContext } from "../../../datacontext";
import { toast } from "react-toastify";
// import axios from 'axios'
const SignupForm = () => {
  const [form] = Form.useForm();
  const { opensignup, setopensignup } = useContext(DataContext);
  const { openLogin, setopenLogin } = useContext(DataContext);
  const Allusers = () => {
    console.log("fetch data");
  };

  const signup = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await axios.post(
        "http://localhost:3000/Auth/signup",
        {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        // alert("Signup successfully");
        toast.success("Signup successfully");

        setopenLogin(true);
        setopensignup(false);
        form.resetFields();
      }

      console.log("RESPONSE", res);
    } catch (error) {
      toast.error("invalid credential");

      console.log("ERROR" + error);
    }
  };

  useEffect(() => {
    Allusers;
  }, []);

  return (
    <Form
      form={form}
      name="signup"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360, width: 400 }}
      onFinish={signup}
    >
      <Form.Item
        name="firstname"
        rules={[{ required: true, message: "Please input your First name!" }]}
      >
        <Input
          className="h-10 sm:h-12"
          prefix={<UserOutlined />}
          placeholder="First name"
        />
      </Form.Item>

      <Form.Item
        name="lastname"
        rules={[{ required: true, message: "Please input your Last name!" }]}
      >
        <Input
          className="h-10 sm:h-12"
          prefix={<UserOutlined />}
          placeholder="Last name"
        />
      </Form.Item>

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
        <Flex justify="space-between" align="center">
          <Input.Password
            prefix={<LockOutlined />}
            className="h-10 sm:h-12"
            type="password"
            placeholder="Password"
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button className="font-bold" block type="primary" htmlType="submit">
          SignUp
        </Button>
        or{" "}
        <a
          onClick={() => {
            setopenLogin(true);
            setopensignup(false);
          }}
        >
          you already have an account? Go to Login
        </a>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
