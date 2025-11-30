import React from "react";
import { BgColorsOutlined } from "@ant-design/icons";
import { Layout, Menu, Badge } from "antd";
import {
  HomeOutlined,
  ReadOutlined,
  SettingOutlined,
  BellOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function MenuBar({
  selected,
  setSelected,
  collapsed,
  setCollapsed,
}) {
  const items = [
    { key: "home", icon: <HomeOutlined />, label: "Home" },
    { key: "feed", icon: <ReadOutlined />, label: "Feed" },

    // 🌈 NEW — Theme Store
    { key: "themes", icon: <BgColorsOutlined />, label: "Themes" },

    { key: "settings", icon: <SettingOutlined />, label: "Settings" },
    {
      key: "notifications",
      icon: (
        <Badge count={3} size="small">
          <BellOutlined />
        </Badge>
      ),
      label: "Notifications",
    },
    { key: "reminders", icon: <CalendarOutlined />, label: "Reminders" },
  ];

  return (
    <Sider
      className="plantly-sider"
      theme="dark"
      width={240}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
      collapsedWidth={80}
      style={{
        position: "fixed",
        insetInlineStart: 0,
        insetBlockStart: 0,
        height: "100vh",
      }}
    >
      <div className="plantly-brand">{collapsed ? "🌿" : "Plantly"}</div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selected]}
        onClick={(e) => setSelected(e.key)} // 👈 handles navigation
        items={items}
      />
    </Sider>
  );
}
