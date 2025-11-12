import React from "react";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Typography,
  message,
  Space,
} from "antd";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function SettingsPage() {
  const [form] = Form.useForm();

  const onFinish = (vals) => {
    // simulate saving all sections at once
    console.log("All settings:", vals);
    message.success("All settings updated ✅", 1.6);
    // form.resetFields(); // uncomment if you want to clear after submit
  };

  return (
    <div className="app-content app-container">
      {/* page header */}
      <Card
        className="plantly-card"
        styles={{ body: { padding: 28, textAlign: "center" } }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Settings
        </Title>
        <Paragraph style={{ marginTop: 6, color: "#595959" }}>
          Update plants, profile, and security in one go.
        </Paragraph>
      </Card>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 16 }}
        initialValues={{
          plantType: "monstera",
          fullName: "Your Name",
          email: "you@example.com",
          username: "your_username",
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Insert Plant Type */}
          <Col xs={24} lg={12}>
            <Card className="plantly-card" styles={{ body: { padding: 24 } }}>
              <Title level={4} style={{ marginTop: 0 }}>
                Insert Plant Type
              </Title>
              <Paragraph type="secondary">
                Primary plant you’re tracking.
              </Paragraph>
              <Form.Item
                label="Plant Type"
                name="plantType"
                rules={[
                  { required: true, message: "Please select a plant type" },
                ]}
              >
                <Select placeholder="Choose a plant">
                  <Option value="monstera">Monstera deliciosa</Option>
                  <Option value="snake">Snake Plant</Option>
                  <Option value="pothos">Pothos</Option>
                  <Option value="fiddle">Fiddle Leaf Fig</Option>
                  <Option value="succulent">Succulent</Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>

          {/* Profile Settings */}
          <Col xs={24} lg={12}>
            <Card className="plantly-card" styles={{ body: { padding: 24 } }}>
              <Title level={4} style={{ marginTop: 0 }}>
                Profile Settings
              </Title>
              <Paragraph type="secondary">Basic profile information.</Paragraph>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Your full name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>
            </Card>
          </Col>

          {/* Change Username */}
          <Col xs={24} lg={12}>
            <Card className="plantly-card" styles={{ body: { padding: 24 } }}>
              <Title level={4} style={{ marginTop: 0 }}>
                Change Username
              </Title>
              <Paragraph type="secondary">Pick a unique username.</Paragraph>
              <Form.Item
                label="New Username"
                name="username"
                rules={[
                  { required: true, message: "Username is required" },
                  { min: 3, message: "At least 3 characters" },
                ]}
              >
                <Input addonBefore="@" placeholder="new-username" />
              </Form.Item>
            </Card>
          </Col>

          {/* Change Password */}
          <Col xs={24} lg={12}>
            <Card className="plantly-card" styles={{ body: { padding: 24 } }}>
              <Title level={4} style={{ marginTop: 0 }}>
                Change Password
              </Title>
              <Paragraph type="secondary">
                Use a strong password you don’t use elsewhere.
              </Paragraph>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  { required: true, message: "Current password is required" },
                ]}
              >
                <Input.Password placeholder="••••••••" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "New password is required" },
                  { min: 6, message: "At least 6 characters" },
                ]}
              >
                <Input.Password placeholder="At least 6 characters" />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmNew"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value)
                        return Promise.resolve();
                      return Promise.reject(
                        new Error("New passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Repeat new password" />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        {/* one update button — centered at bottom */}
        <div className="settings-footer">
          <Space>
            <Button size="large" onClick={() => form.resetFields()}>
              Reset
            </Button>
            <Button type="primary" size="large" htmlType="submit">
              Update All Settings
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
}
