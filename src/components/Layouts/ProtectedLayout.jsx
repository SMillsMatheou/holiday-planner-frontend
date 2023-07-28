import { useState, useEffect } from "react";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/";
import axios from "../../axios";
import { useApi } from "../../hooks";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function ProtectedLayout() {
  const { user, setUser } = useAuth();
  const { logout } = useApi();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    getItem(<Link to="profile">Profile</Link>, "1", <UserOutlined />),
    getItem(<Link to="activities">Activities</Link>, "2", <CalendarOutlined />),
    getItem(<Link to="about">About</Link>, "3"),
    getItem("Test 1", "sub1", <ScheduleOutlined />, [
      getItem("samtest 1", "4"),
      getItem("samtest 2", "5"),
      getItem("samtest 3", "6"),
    ]),
    getItem(<Link to="test">Test</Link>, "7"),
    getItem(
      <Button
        type="link"
        onClick={() => {
          logout();
          setUser(null);
          navigate("/");
        }}
      >
        Logout
      </Button>,
      8,
      <LogoutOutlined />
    ),
  ];

  useEffect(() => {
    console.log("???");
    async () => {
      try {
        const resp = await axios.get("/user");
        if (resp.status === 200) {
          setUser(resp.data.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          window.location.href = "/";
        }
      }
    };
  }, []);

  // logout user
  // const handleLogout = async () => {
  //     try {
  //         const resp = await axios.post('/logout');
  //         if(resp.status === 200) {
  //             localStorage.removeItem('user');
  //             window.location.href = '/';
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }
  console.log(user, "hmm");
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="test">TEST</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Activity</Breadcrumb.Item>
            <Breadcrumb.Item>1</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Samtest footer ©2023 Created by Sam
        </Footer>
      </Layout>
    </Layout>
  );
}
