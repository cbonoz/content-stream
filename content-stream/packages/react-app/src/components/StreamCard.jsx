import React from "react";
import PropTypes from "prop-types";
import { Card, Avatar } from "antd";
import { DollarOutlined, EditOutlined, EllipsisOutlined, InfoOutlined, SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;

const defaultImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
function StreamCard({ key, data }) {
  const onClick = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal(/* optional configuration*/);
  };
  const viewInfo = () => {};
  return (
    <Card
      style={{ width: 300, cursor: "pointer", margin: "10px" }}
      cover={<img alt="example" src={defaultImage} />}
      actions={[
        <DollarOutlined key="purchase" onClick={onClick} />,
        <InfoOutlined key="info" onClick={viewInfo} />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={data.title}
        description={data.description}
      />
    </Card>
  );
}

StreamCard.propTypes = {};

export default StreamCard;
