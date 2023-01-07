import { Space, Spin } from "antd";
import React from "react";
import "./loader.css";

export const Loader = () => {
  return (
    <div className="loader">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};
