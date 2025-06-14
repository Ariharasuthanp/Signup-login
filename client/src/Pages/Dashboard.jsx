import { Avatar, Button, Card, Flex, Typography } from "antd";
import React from "react";
import { useAuth } from "../Contexts/AuthContext";
import { UserOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar size={150} icon={<UserOutlined />} className="avatar" />
        <Typography.Title level={2} className="username">
          <strong>{user?.name || "Guest"}</strong>
        </Typography.Title>
        <Typography.Text type="secondary">
          <strong>Email:</strong> {user?.email || "Not provided"}
        </Typography.Text>
        <Typography.Text type="secondary">
          <strong>Role:</strong> {user?.role || "User"}
        </Typography.Text>
        <Button
          size="large"
          type="default"
          danger
          className="profile-btn"
          onClick={logout}
        >
          Logout
        </Button>
      </Flex>
    </Card>
  );
};

export default Dashboard;
