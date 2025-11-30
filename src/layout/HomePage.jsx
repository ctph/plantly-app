// import React from "react";
// import { Layout, Row, Col, Card, Typography } from "antd";
// import dayjs from "dayjs";
// import HomeCard from "../components/HomeCard";
// import plantBanner from "../assets/image.png"; // your NEW background image
// import useReminders from "../hooks/useReminders";

// const { Header, Content } = Layout;
// const { Title, Paragraph, Text } = Typography;

// export default function HomePage() {
//   const { next } = useReminders();

//   return (
//     <Layout
//       className="homepage-bg"
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${plantBanner})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <Header className="app-header">
//         <Title level={3} style={{ margin: 0 }}>
//           Home
//         </Title>
//       </Header>

//       <Content className="app-content">
//         <div className="app-container">
//           {/* Welcome Section */}
//           <HomeCard />

//           {/* 🌿 Image Section (you can remove this soon) */}
//           <div className="home-image-banner">
//             <img src={plantBanner} alt="Plants Banner" className="plant-pet" />
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

import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Typography, InputNumber } from "antd";
import dayjs from "dayjs";
import HomeCard from "../components/HomeCard";
import plantBanner from "../assets/image.png";
import useReminders from "../hooks/useReminders";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function HomePage({ goToReminders }) {
  const { next } = useReminders();

  // 🌈 Load theme background from localStorage (fallback to default)
  const [bg, setBg] = useState(() => {
    return localStorage.getItem("plantly.selectedTheme") || plantBanner;
  });

  useEffect(() => {
    const loadTheme = () => {
      const saved = localStorage.getItem("plantly.selectedTheme");
      setBg(saved || plantBanner);
    };

    // initial check
    loadTheme();

    // listen for theme changes from ThemeStorePage
    window.addEventListener("plantly:themeUpdated", loadTheme);
    return () => window.removeEventListener("plantly:themeUpdated", loadTheme);
  }, []);

  // your existing states & functions...
  const [water, setWater] = useState(50);
  const [sunlight, setSunlight] = useState(50);
  const [nutrient, setNutrient] = useState(50);

  const getWaterStatus = (v) => {
    if (v < 30) return "Soil is dry — please water your plant 💧";
    if (v <= 40) return "Water level is perfect 😊";
    return "Soil too wet — reduce watering ⚠️";
  };

  const getSunlightStatus = (v) => {
    if (v < 30) return "Plant not getting enough sunlight 🌥️";
    if (v <= 40) return "Sunlight level is ideal ☀️";
    return "Too much sunlight — avoid burning 🔥";
  };

  const getNutrientStatus = (v) => {
    if (v < 30) return "Nutrients low — consider fertilizing 🌱";
    if (v <= 40) return "Nutrient level is healthy 👍";
    return "Too much fertilizer — risk of burn ⚠️";
  };

  return (
    <>
      {/* 🔥 Fixed background layer behind everything */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1, // sit behind all app content
        }}
      />

      <Layout
        className="homepage-bg"
        style={{
          minHeight: "100vh",
          background: "transparent", // make sure Layout itself isn't blocking
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

            {/* Plant Image */}
            <div className="home-image-banner">
              <img
                src={plantBanner}
                alt="Plants Banner"
                className="plant-pet"
              />
            </div>

            {/* Status Cards */}
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
              {/* Water */}
              <Col xs={24} sm={12} lg={6}>
                <Card hoverable className="card-hero">
                  <Title level={4}>Water</Title>
                  <InputNumber
                    value={water}
                    min={0}
                    max={100}
                    onChange={(v) => setWater(v ?? 0)}
                    style={{ marginBottom: 8 }}
                  />
                  <Paragraph type="secondary">
                    {getWaterStatus(water)}
                  </Paragraph>
                </Card>
              </Col>

              {/* Sunlight */}
              <Col xs={24} sm={12} lg={6}>
                <Card hoverable className="card-hero">
                  <Title level={4}>Sunlight</Title>
                  <InputNumber
                    value={sunlight}
                    min={0}
                    max={100}
                    onChange={(v) => setSunlight(v ?? 0)}
                    style={{ marginBottom: 8 }}
                  />
                  <Paragraph type="secondary">
                    {getSunlightStatus(sunlight)}
                  </Paragraph>
                </Card>
              </Col>

              {/* Nutrient */}
              <Col xs={24} sm={12} lg={6}>
                <Card hoverable className="card-hero">
                  <Title level={4}>Nutrient</Title>
                  <InputNumber
                    value={nutrient}
                    min={0}
                    max={100}
                    onChange={(v) => setNutrient(v ?? 0)}
                    style={{ marginBottom: 8 }}
                  />
                  <Paragraph type="secondary">
                    {getNutrientStatus(nutrient)}
                  </Paragraph>
                </Card>
              </Col>

              {/* Reminder */}
              <Col xs={24} sm={12} lg={6}>
                <Card
                  hoverable
                  className="card-hero"
                  onClick={goToReminders}
                  style={{ cursor: "pointer" }}
                >
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
                      "No upcoming reminders. Tap to add one!"
                    )}
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
}
