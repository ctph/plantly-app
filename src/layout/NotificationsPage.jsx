import React from "react";
import { List, Typography, Badge, Avatar, Card, Space } from "antd";
import {
  BellOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const data = [
  {
    id: "n1",
    title: "Watering reminder",
    desc: "It’s time to water Monstera and Snake Plant.",
    time: "2m ago",
    icon: <BellOutlined />,
    unread: true,
  },
  {
    id: "n2",
    title: "New comment",
    desc: "Jamie replied to your post in Community.",
    time: "25m ago",
    icon: <MessageOutlined />,
    unread: true,
  },
  {
    id: "n3",
    title: "Settings updated",
    desc: "Your notification preferences were saved.",
    time: "1h ago",
    icon: <SettingOutlined />,
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <Card className="plantly-card" styles={{ body: { padding: 24 } }}>
      <Space direction="vertical" size={8} style={{ width: "100%" }}>
        <Title level={3} style={{ margin: 0 }}>
          Notifications
        </Title>
        <Text type="secondary">
          You have <Text strong>3</Text> notifications.
        </Text>
      </Space>

      <List
        style={{ marginTop: 16 }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Badge dot={item.unread}>
                  <Avatar shape="circle" icon={item.icon} />
                </Badge>
              }
              title={
                <Space>
                  <Text strong>{item.title}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.time}
                  </Text>
                </Space>
              }
              description={<Text>{item.desc}</Text>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
