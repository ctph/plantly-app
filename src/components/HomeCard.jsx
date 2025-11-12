import React from "react";
import { Card, Typography, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function HomeCard({ selected }) {
  return (
    <Card className="card-hero" styles={{ body: { textAlign: "center" } }}>
      <Space
        direction="vertical"
        align="center"
        size={12}
        style={{ width: "100%" }}
      >
        <Title level={2} className="h-noWrap" style={{ margin: 0 }}>
          Welcome to Plantly 🌿
        </Title>
        <Paragraph style={{ marginBottom: 0, color: "#595959" }}>
          You are viewing the <Text strong>{selected}</Text> section.
        </Paragraph>
      </Space>
    </Card>
  );
}
