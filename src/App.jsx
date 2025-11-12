import React, { useState } from "react";
import "./App.css";
import HomePage from "./layout/HomePage";
import NotificationsPage from "./layout/NotificationsPage";
import SettingsPage from "./layout/SettingsPage";
import MenuBar from "./components/MenuBar";
import FeedPage from "./layout/FeedPage";
import { Layout } from "antd";

export default function App() {
  const [selected, setSelected] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const siderWidth = collapsed ? 80 : 240;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <MenuBar
        selected={selected}
        setSelected={setSelected}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Page content */}
      <Layout style={{ marginInlineStart: siderWidth }}>
        {selected === "home" && <HomePage />}
        {selected === "notifications" && <NotificationsPage />}
        {selected === "settings" && <SettingsPage />}
        {selected === "feed" && <FeedPage />}
        {/* you can later add feed/settings pages too */}
      </Layout>
    </Layout>
  );
}
