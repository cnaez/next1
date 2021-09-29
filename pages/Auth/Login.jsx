import { useCookie } from "next-cookie";
import React, { useState } from "react";
import http from "../../utils/http";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import MainLayout from "../../components/Layouts/MainLayout";

export default function Login() {
  const api = http();
  const cookie = useCookie();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    if (!user || !password) {
      setMessage("اطلاعات شما تکمیل نیست");
      return;
    }

    const data = {
      username: user,
      password: password,
    };

    api.login(({ data }) => {
      console.log(data.message);
      setMessage(data.message);
      if (data.isSuccess) {
        cookie.set("token", data.token, {
          secure: true,
          domain: "http://api.mostafa-h.ir/",
        });
      }
    }, data);
  };

  return (
    <MainLayout>
      {message && <Alert type="error" message={message}></Alert>}

      <Form
        method="post"
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            id="pass"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={onSubmit}
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </MainLayout>
  );
}
