import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useLocation } from "react-router";
import { MENU_ITEMS } from "./constant";
import "./components/style.css";

function App() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [items] = useState(MENU_ITEMS);
  return (
    <div className="app_container">
      <Layout className="app_container_layout">
        <Header className="bg-darkBlueColor text-white text-center text-lg md:text-2xl py-3 px-2 font-semibold">
          Product Analytics Dashboard
        </Header>
        <Layout>
          <Sider
            className="app_container_sider p-0"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[
                location.pathname === "/" ? "home" : location.pathname.slice(1),
              ]}
              items={items}
              className="app_container_menu"
            />
          </Sider>
          <Content className="p-4">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
