import React from "react";
import { Card, Avatar, Typography, Space, Button, Tag } from "antd";

const { Text, Paragraph } = Typography;

export default function ProfileCard() {
  return (
    <Card className="plantly-card" styles={{ body: { padding: 20 } }}>
      <Space align="center" size={16} style={{ width: "100%" }}>
        <Avatar
          size={64}
          src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&q=80&auto=format&fit=crop"
        />
        <div>
          <Text strong>@plant.ly</Text>
          <div style={{ marginTop: 4 }}>
            <Tag color="green">Verified</Tag>
          </div>
        </div>
      </Space>

      <Space size="large" style={{ marginTop: 16 }}>
        <div>
          <Text strong>1,248</Text>
          <br />
          <Text type="secondary">Posts</Text>
        </div>
        <div>
          <Text strong>12.3k</Text>
          <br />
          <Text type="secondary">Followers</Text>
        </div>
        <div>
          <Text strong>341</Text>
          <br />
          <Text type="secondary">Following</Text>
        </div>
      </Space>

      <Paragraph style={{ marginTop: 12 }}>
        Plant diaries, care tips, and weekly repots 🌿
      </Paragraph>

      {/* <Button type="primary" block>
        Follow
      </Button> */}
    </Card>
  );
}
