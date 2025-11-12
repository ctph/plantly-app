import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  DatePicker,
  TimePicker,
  Input,
  Button,
  List,
  Space,
  Typography,
  Tag,
  message,
  Popconfirm,
} from "antd";
import {
  CalendarOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;

const LS_KEY = "plantly.reminders.v1";

export default function RemindersPage() {
  const [date, setDate] = useState(null); // dayjs
  const [time, setTime] = useState(null); // dayjs
  const [desc, setDesc] = useState("");
  const [items, setItems] = useState([]);

  // load / persist
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const addReminder = () => {
    if (!date || !time || !desc.trim()) {
      message.warning("Pick a date, time, and add a description.");
      return;
    }
    const when = date
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .millisecond(0);

    const next = {
      id: Date.now(),
      whenISO: when.toISOString(),
      desc: desc.trim(),
      done: false,
    };
    setItems((prev) => [next, ...prev]);
    setDate(null);
    setTime(null);
    setDesc("");
    message.success("Reminder added ✅");
  };

  const markDone = (id) =>
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  const removeOne = (id) => setItems((prev) => prev.filter((r) => r.id !== id));

  const sorted = useMemo(
    () => [...items].sort((a, b) => new Date(a.whenISO) - new Date(b.whenISO)),
    [items]
  );

  return (
    <div className="page-scroll page-green">
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 16 }}>
          Reminders
        </Title>

        <Card className="plantly-card" styles={{ body: { padding: 16 } }}>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <Space wrap>
              <DatePicker
                value={date}
                onChange={setDate}
                placeholder="Pick date"
                allowClear
              />
              <TimePicker
                value={time}
                onChange={setTime}
                format="HH:mm"
                minuteStep={5}
                placeholder="Pick time"
                allowClear
              />
            </Space>
            <TextArea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What should I do?"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
            <Button
              type="primary"
              icon={<CalendarOutlined />}
              onClick={addReminder}
            >
              Add reminder
            </Button>
          </Space>
        </Card>

        <Card
          className="plantly-card"
          style={{ marginTop: 16 }}
          styles={{ body: { padding: 0 } }}
          bordered={false}
        >
          <List
            locale={{ emptyText: "No reminders yet" }}
            dataSource={sorted}
            renderItem={(r) => {
              const when = dayjs(r.whenISO);
              const past = when.isBefore(dayjs());
              return (
                <List.Item
                  style={{ padding: 14 }}
                  actions={[
                    <Button
                      size="small"
                      type={r.done ? "default" : "link"}
                      icon={<CheckCircleOutlined />}
                      onClick={() => markDone(r.id)}
                    >
                      {r.done ? "Undo" : "Done"}
                    </Button>,
                    <Popconfirm
                      title="Delete this reminder?"
                      okText="Delete"
                      onConfirm={() => removeOne(r.id)}
                    >
                      <Button danger size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text strong delete={r.done}>
                          {when.format("ddd, MMM D")} • {when.format("HH:mm")}
                        </Text>
                        {r.done && <Tag color="green">done</Tag>}
                        {!r.done && past && <Tag color="red">missed</Tag>}
                      </Space>
                    }
                    description={
                      <Text type="secondary" style={{ whiteSpace: "pre-wrap" }}>
                        {r.desc}
                      </Text>
                    }
                  />
                </List.Item>
              );
            }}
          />
        </Card>
      </div>
    </div>
  );
}
