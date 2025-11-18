// import React from "react";
// import { Layout, Row, Col, Card, Typography } from "antd";
// import dayjs from "dayjs";
// import HomeCard from "../components/HomeCard";
// import plantBanner from "../assets/plant.jpg";
// import useReminders from "../hooks/useReminders";
// import plantBg from "../assets/plant_bg.png";

// const { Header, Content } = Layout;
// const { Title, Paragraph, Text } = Typography;

// export default function HomePage() {
//   const { next } = useReminders();

//   return (
//     <Layout className="homepage-bg">
//       <Header className="app-header">
//         <Title level={3} style={{ margin: 0 }}>
//           Home
//         </Title>
//       </Header>

//       <Content className="app-content">
//         <div className="app-container">
//           {/* Welcome Section */}
//           <HomeCard />

//           {/* 🌿 Image Section */}
//           <div className="home-image-banner">
//             <img src={plantBanner} alt="Plants Banner" />
//           </div>

//           {/* Status Cards */}
//           <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
//             <Col xs={24} sm={12} lg={6}>
//               <Card hoverable className="card-hero">
//                 <Title level={4}>Water</Title>
//                 <Paragraph type="secondary">
//                   Watering not required in the morning.
//                 </Paragraph>
//               </Card>
//             </Col>

//             <Col xs={24} sm={12} lg={6}>
//               <Card hoverable className="card-hero">
//                 <Title level={4}>Sunlight</Title>
//                 <Paragraph type="secondary">
//                   Sunlight sufficient and lighting is great.
//                 </Paragraph>
//               </Card>
//             </Col>

//             <Col xs={24} sm={12} lg={6}>
//               <Card hoverable className="card-hero">
//                 <Title level={4}>Nutrient</Title>
//                 <Paragraph type="secondary">
//                   Soil pH great. Fertilizers still working — hooray!
//                 </Paragraph>
//               </Card>
//             </Col>

//             {/* Reminder card – uses next from useReminders */}
//             <Col xs={24} sm={12} lg={6}>
//               <Card hoverable className="card-hero">
//                 <Title level={4} style={{ marginBottom: 8 }}>
//                   Reminder
//                 </Title>
//                 <Paragraph type="secondary" style={{ marginBottom: 0 }}>
//                   {next ? (
//                     <Text>
//                       <Text strong>
//                         {dayjs(next.whenISO).format("ddd, MMM D")}
//                       </Text>
//                       {" • "}
//                       <Text code>{dayjs(next.whenISO).format("HH:mm")}</Text>
//                       {" — "}
//                       {next.desc}
//                     </Text>
//                   ) : (
//                     "No upcoming reminders. Add one in the Reminders page."
//                   )}
//                 </Paragraph>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </Content>
//     </Layout>
//   );
// }

import React from "react";
import { Layout, Row, Col, Card, Typography } from "antd";
import dayjs from "dayjs";
import HomeCard from "../components/HomeCard";
import plantBanner from "../assets/image.png"; // your NEW background image
import useReminders from "../hooks/useReminders";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  const { next } = useReminders();

  return (
    <Layout
      className="homepage-bg"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${plantBanner})`, // 🔥 FIXED HERE
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header className="app-header">
        <Title level={3} style={{ margin: 0 }}>
          Home
        </Title>
      </Header>

      <Content className="app-content">
        <div className="app-container">
          {/* Welcome Section */}
          <HomeCard />

          {/* 🌿 Image Section (you can remove this soon) */}
          <div className="home-image-banner">
            <img src={plantBanner} alt="Plants Banner" className="plant-pet" />
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
                <Title level={4} style={{ marginBottom: 8 }}>
                  Reminder
                </Title>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  {next ? (
                    <Text>
                      <Text strong>
                        {dayjs(next.whenISO).format("ddd, MMM D")}
                      </Text>
                      {" • "}
                      <Text code>{dayjs(next.whenISO).format("HH:mm")}</Text>
                      {" — "}
                      {next.desc}
                    </Text>
                  ) : (
                    "No upcoming reminders. Add one in the Reminders page."
                  )}
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
