// src/layout/ChatPage.jsx
import React, { useState } from "react";
import {
  Layout,
  Card,
  Typography,
  Input,
  Button,
  List,
  Space,
  Avatar,
  Spin,
} from "antd";
import { SendOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I’m your Plantly AI assistant 🌿\nAsk me anything about your plants, reminders, or app status.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      let replyText = "";

      if (res.ok) {
        const data = await res.json();
        // Expect backend to respond with { reply: "..." }
        replyText =
          data.reply ||
          "I received your message, but the backend didn't return any text.";
      } else {
        // fallback fake text if backend returns error
        replyText =
          "I tried to ask the AI backend, but something went wrong. (You can still wire this to your real API later.)";
      }

      const botMsg = {
        id: Date.now() + 1,
        role: "assistant",
        text: replyText,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const botMsg = {
        id: Date.now() + 1,
        role: "assistant",
        text: "Oops, I couldn't reach the server. This is a fake AI reply. Once you connect /api/chat on your backend, I’ll answer for real 🌿",
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Header
        className="app-header"
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          paddingInline: 24,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          AI Chat
        </Title>
      </Header>

      <Content className="app-content" style={{ padding: "16px 24px" }}>
        <div
          className="app-container"
          style={{ maxWidth: 900, margin: "0 auto" }}
        >
          <Card
            className="plantly-card"
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              height: "70vh",
              padding: 16,
            }}
          >
            {/* Messages list */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: 4,
                marginBottom: 12,
              }}
            >
              <List
                dataSource={messages}
                rowKey="id"
                renderItem={(msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <List.Item
                      style={{
                        border: "none",
                        padding: "4px 0",
                        display: "flex",
                        justifyContent: isUser ? "flex-end" : "flex-start",
                      }}
                    >
                      <Space
                        align="start"
                        style={{
                          maxWidth: "75%",
                          flexDirection: isUser ? "row-reverse" : "row",
                        }}
                      >
                        <Avatar
                          size="small"
                          icon={isUser ? <UserOutlined /> : <RobotOutlined />}
                          style={{
                            backgroundColor: isUser ? "#1677ff" : "#52c41a",
                          }}
                        />
                        <Card
                          size="small"
                          style={{
                            backgroundColor: isUser ? "#1677ff" : "#f6ffed",
                            color: isUser ? "#fff" : "#000",
                            borderRadius: 12,
                          }}
                          bodyStyle={{ padding: "8px 10px" }}
                        >
                          <Text
                            style={{
                              whiteSpace: "pre-wrap",
                              color: isUser ? "#fff" : "#000",
                            }}
                          >
                            {msg.text}
                          </Text>
                        </Card>
                      </Space>
                    </List.Item>
                  );
                }}
              />
              {loading && (
                <div style={{ textAlign: "left", marginTop: 4 }}>
                  <Space>
                    <Spin size="small" />
                    <Text type="secondary">AI is thinking…</Text>
                  </Space>
                </div>
              )}
            </div>

            {/* Input area */}
            <div>
              <TextArea
                rows={2}
                placeholder="Ask Plantly AI anything…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ marginBottom: 8 }}
              />
              <div style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
