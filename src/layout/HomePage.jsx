import React from "react";
import { Typography, Card, Row, Col } from "antd";
import HomeCard from "../components/HomeCard";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <div className="app-content app-container">
      {/* top hero card */}
      <HomeCard selected="home" />

      {/* info cards */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="card-hero"
            styles={{ body: { padding: 24 } }}
          >
            <Title level={4} style={{ marginBottom: 8 }}>
              Water
            </Title>
            <Paragraph type="secondary">
              Watering not required in the morning.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="card-hero"
            styles={{ body: { padding: 24 } }}
          >
            <Title level={4} style={{ marginBottom: 8 }}>
              Sunlight
            </Title>
            <Paragraph type="secondary">
              Sunlight sufficient and lighting is great.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="card-hero"
            styles={{ body: { padding: 24 } }}
          >
            <Title level={4} style={{ marginBottom: 8 }}>
              Nutrient
            </Title>
            <Paragraph type="secondary">
              Soil pH is great. Fertilizer still working — hooray!
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            className="card-hero"
            styles={{ body: { padding: 24 } }}
          >
            <Title level={4} style={{ marginBottom: 8 }}>
              Reminder
            </Title>
            <Paragraph type="secondary">
              Remind Mum to water plant at 5 PM.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
