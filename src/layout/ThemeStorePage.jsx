import React, { useMemo, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Input,
  Segmented,
  Select,
  Tag,
  Button,
  Rate,
  Space,
} from "antd";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

// Fake theme data
const THEMES = [
  {
    id: "minimal-light",
    name: "Canyon Light",
    author: "Plantly",
    category: "Nature",
    tags: ["clean", "white", "focus"],
    rating: 4.8,
    installs: 12450,
    thumb: "https://images.pexels.com/photos/63553/pexels-photo-63553.jpeg",
  },
  {
    id: "forest-mist",
    name: "Forest Mist",
    author: "Green Labs",
    category: "Nature",
    tags: ["green", "plants", "soft"],
    rating: 4.6,
    installs: 9860,
    thumb: "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg",
  },
  {
    id: "midnight-dark",
    name: "Rainier Terrain",
    author: "Night Owl",
    category: "Dark",
    tags: ["dark", "contrast", "pro"],
    rating: 4.9,
    installs: 20132,
    thumb: "https://images.pexels.com/photos/4448861/pexels-photo-4448861.jpeg",
  },
  {
    id: "sunny-desk",
    name: "Bali Bay",
    author: "Plantly",
    category: "Fun",
    tags: ["yellow", "playful", "bright"],
    rating: 4.2,
    installs: 5430,
    thumb: "https://images.pexels.com/photos/952846/pexels-photo-952846.jpeg",
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    author: "Blue Studio",
    category: "Nature",
    tags: ["blue", "calm", "ocean"],
    rating: 4.5,
    installs: 8720,
    thumb: "https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg",
  },
  {
    id: "mono-slate",
    name: "Zion Rock",
    author: "Minimal Co.",
    category: "Minimal",
    tags: ["gray", "simple", "neutral"],
    rating: 4.3,
    installs: 6570,
    thumb: "https://images.pexels.com/photos/248820/pexels-photo-248820.jpeg",
  },
];

export default function ThemeStorePage() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = [...THEMES];

    if (category !== "All") {
      result = result.filter((t) => t.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.author.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (sort === "popular") {
      result.sort((a, b) => b.installs - a.installs);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "new") {
      // fake "new" = reverse id order
      result.sort((a, b) => (a.id < b.id ? 1 : -1));
    }

    return result;
  }, [category, sort, query]);

  const handleApply = (theme) => {
    localStorage.setItem("plantly.selectedTheme", theme.thumb);
    window.dispatchEvent(new Event("plantly:themeUpdated"));
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          paddingInline: 24,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Theme Store
        </Title>
      </Header>

      <Content style={{ padding: "24px 32px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* Top controls */}
          <Card
            style={{ marginBottom: 16 }}
            bodyStyle={{
              padding: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Space direction="vertical" size={4}>
              <Text type="secondary">Browse themes</Text>
              <Title level={4} style={{ margin: 0 }}>
                Make Plantly feel more you 🌿
              </Title>
            </Space>

            <Space wrap size={12}>
              <Segmented
                options={["All", "Minimal", "Dark", "Nature", "Fun"]}
                value={category}
                onChange={setCategory}
              />

              <Select
                value={sort}
                style={{ width: 160 }}
                onChange={setSort}
                options={[
                  { value: "popular", label: "Most popular" },
                  { value: "rating", label: "Top rated" },
                  { value: "new", label: "Newest" },
                ]}
              />
            </Space>
          </Card>

          {/* Search bar */}
          <div style={{ marginBottom: 16 }}>
            <Search
              placeholder="Search themes (e.g. dark, nature, minimal)"
              allowClear
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Grid of themes */}
          <Row gutter={[16, 16]}>
            {filtered.map((theme) => (
              <Col xs={24} sm={12} md={8} lg={6} key={theme.id}>
                <Card
                  hoverable
                  className="theme-card"
                  cover={
                    <div
                      style={{
                        height: 140,
                        overflow: "hidden",
                        borderRadius: "8px 8px 0 0",
                      }}
                    >
                      <img
                        src={theme.thumb}
                        alt={theme.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  }
                  bodyStyle={{ padding: 12 }}
                >
                  <Space
                    direction="vertical"
                    style={{ width: "100%" }}
                    size={4}
                  >
                    <Space
                      align="baseline"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text strong>{theme.name}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {theme.author}
                      </Text>
                    </Space>

                    <Space size={4} wrap>
                      <Rate
                        disabled
                        allowHalf
                        value={theme.rating}
                        style={{ fontSize: 14 }}
                      />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {theme.rating.toFixed(1)} •{" "}
                        {theme.installs.toLocaleString()} installs
                      </Text>
                    </Space>

                    <Space size={4} wrap style={{ marginTop: 4 }}>
                      {theme.tags.map((tag) => (
                        <Tag key={tag} bordered={false} color="default">
                          {tag}
                        </Tag>
                      ))}
                    </Space>

                    <Button
                      type="primary"
                      block
                      style={{ marginTop: 8 }}
                      onClick={() => handleApply(theme)}
                    >
                      Apply theme
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}

            {filtered.length === 0 && (
              <Col span={24}>
                <Card>
                  <Paragraph style={{ textAlign: "center", margin: 0 }}>
                    No themes match your filters. Try clearing the search or
                    switching categories.
                  </Paragraph>
                </Card>
              </Col>
            )}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
