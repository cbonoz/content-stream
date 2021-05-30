import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Avatar } from "antd";
import { DollarOutlined, EllipsisOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { LOCK_ADDRESS } from "./Discover/util";
import { Modal, Button } from "antd";

const { Meta } = Card;

const defaultImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
function StreamCard({ key, data }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onClick = () => {
    console.log("unlock", window.unlockProtocol);
    window.unlockProtocolConfig.callToAction.default = `This stream package ${data.title} is available for 0.01 Eth. Pay with cryptocurrency to add it to your wallet and access it!`;
    window.unlockProtocolConfig.locks[LOCK_ADDRESS].name = data.title;
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal(/* optional configuration*/);
  };
  const viewInfo = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => setIsModalVisible(false);
  return (
    <Card
      style={{ width: 300, cursor: "pointer", margin: "10px" }}
      cover={<img alt="example" className="card-image" src={data.img || defaultImage} />}
      actions={[
        <DollarOutlined key="purchase" onClick={onClick} />,
        <InfoCircleOutlined key="info" onClick={viewInfo} />,
        // <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={data.title}
        description={"Purchase or preview this stream."}
      />
      <Modal title={data.title} visible={isModalVisible} onOk={handleOk}>
        <h4>{data.userName}</h4>
        <p>This stream was recorded on {data.createdAt.toLocaleDateString()}.</p>
        <p>Purchasing this item grants you the right to share, repost, and download the original recording.</p>
      </Modal>
    </Card>
  );
}

StreamCard.propTypes = {};

export default StreamCard;
