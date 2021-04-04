import React from "react";
import { Space, Spin } from "antd";

const Spinner = () => {
  return (
    <Space size="large">
      <Spin
        style={{ marginTop: "20em", marginLeft: "50em" }}
        tip="Loading..."
        size="large"
      />
    </Space>
  );
};

export default Spinner;
