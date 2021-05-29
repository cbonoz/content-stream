import React from "react";
import PropTypes from "prop-types";
import { Card, Avatar } from "antd";
import { DollarOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;

function StreamCard({ key, data }) {
  const onClick = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal(/* optional configuration*/);
  };
  return (
    <Card
      style={{ width: 300, cursor: "pointer", margin: "10px" }}
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
      actions={[
        <DollarOutlined key="purchase" onClick={onClick} />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={data.title}
        description="This is the description"
      />
    </Card>
  );
}

StreamCard.propTypes = {};

export default StreamCard;
