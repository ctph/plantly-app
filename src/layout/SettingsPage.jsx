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
} from "antd";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export default function SettingsPage() {
  const [plantForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [usernameForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const onFakeSuccess = (msg) => {
    message.success({ content: msg, duration: 1.4 });
  };

  return (
    <div className="app-content app-container">
      {/* Header Card */}
      <Card
        className="plantly-card"
        styles={{ body: { padding: 28, textAlign: "center" } }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Settings
        </Title>
        <Paragraph style={{ marginTop: 6, color: "#595959" }}>
          Manage your profile, plants, and security preferences.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {/* Insert Plant Type */}
        <Col xs={24} lg={12}>
          <Card className="plantly-card" styles={{ body: { padding: 24 } }}>
            <Title level={4} style={{ marginTop: 0 }}>
              Insert Plant Type
            </Title>
            <Paragraph type="secondary">
              Add the primary plant type you’re tracking.
            </Paragraph>
            <Form
              form={plantForm}
              layout="vertical"
              onFinish={(vals) => {
                onFakeSuccess(`Saved plant type: ${vals.plantType}`);
                plantForm.resetFields();
              }}
            >
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
              <Button type="primary" htmlType="submit" block>
                Save Plant Type
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Profile Settings */}
        <Col xs={24} lg={12}>
          <Card className="plantly-card" styles={{ body: { padding: 24 } }}>
            <Title level={4} style={{ marginTop: 0 }}>
              Profile Settings
            </Title>
            <Paragraph type="secondary">
              Update your basic profile information.
            </Paragraph>
            <Form
              form={profileForm}
              layout="vertical"
              initialValues={{
                fullName: "Curwen Tan",
                email: "you@example.com",
              }}
              onFinish={(vals) => {
                onFakeSuccess("Profile updated successfully");
              }}
            >
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
              <Button type="primary" htmlType="submit" block>
                Save Profile
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Change Username */}
        <Col xs={24} lg={12}>
          <Card className="plantly-card" styles={{ body: { padding: 24 } }}>
            <Title level={4} style={{ marginTop: 0 }}>
              Change Username
            </Title>
            <Paragraph type="secondary">
              Pick a unique username for your account.
            </Paragraph>
            <Form
              form={usernameForm}
              layout="vertical"
              onFinish={(vals) => {
                onFakeSuccess(`Username changed to @${vals.username}`);
                usernameForm.resetFields();
              }}
            >
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
              <Button type="primary" htmlType="submit" block>
                Change Username
              </Button>
            </Form>
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
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={({ currentPassword, newPassword, confirmNew }) => {
                if (newPassword !== confirmNew) {
                  message.error("New passwords do not match");
                  return;
                }
                onFakeSuccess("Password changed successfully");
                passwordForm.resetFields();
              }}
            >
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
                ]}
              >
                <Input.Password placeholder="Repeat new password" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Change Password
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
