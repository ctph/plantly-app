import React from "react";
import { Layout, Row, Col, Card, Typography } from "antd";
import HomeCard from "../components/HomeCard";
import plantBanner from "../assets/plant.jpg";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <Layout>
      <Header className="app-header">
        <Title level={3} style={{ margin: 0 }}>
          Home
        </Title>
      </Header>

      <Content className="app-content">
        <div className="app-container">
          {/* Welcome Section */}
          <HomeCard />

          {/* 🌿 Image Section */}
          <div className="home-image-banner">
            <img src={plantBanner} alt="Plants Banner" />
          </div>

          {/* Status Cards */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="card-hero">
                <Title level={4}>Water</Title>
                <Paragraph type="secondary">
                  Watering not required in the morning.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="card-hero">
                <Title level={4}>Sunlight</Title>
                <Paragraph type="secondary">
                  Sunlight sufficient and lighting is great.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="card-hero">
                <Title level={4}>Nutrient</Title>
                <Paragraph type="secondary">
                  Soil pH great. Fertilizers still working — hooray!
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="card-hero">
                <Title level={4}>Reminder</Title>
                <Paragraph type="secondary">
                  Remind Mum to water plant at 5 PM.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
