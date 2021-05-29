import React, { useState } from "react";
import { Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  DollarCircleTwoTone,
  UploadOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import { Layout } from "antd";
import { Button, Radio } from "antd";
import { StreamDropzone } from "../StreamDropzone";

const { Header, Footer, Sider, Content } = Layout;

const { Step } = Steps;

const NUM_STEPS = 4;

function SellStream(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [info, setInfo] = useState({});

  const clearInfo = () => setInfo({});

  const updateInfo = update => {
    setInfo({ ...info, ...update });
  };

  const updateStep = offset => {
    const newStep = currentStep + offset;
    console.log("update step", newStep);
    setCurrentStep(newStep);
  };

  const getBody = () => {
    switch (currentStep) {
      case 1: // confirm login
        return <div></div>;
      case 2: // info
        return <div></div>;
      case 3: // upload
        return (
          <div>
            <StreamDropzone />
          </div>
        );
      case 4: // done
        return (
          <div>
            <h1>Complete!</h1>
            {info.url && (
              <a href={info.url} target="_blank">
                Click here to view listing.
              </a>
            )}
          </div>
        );
    }
  };

  return (
    <div className="content">
      <h1>List new stream in marketplace</h1>
      <Header>
        <Steps current={currentStep}>
          <Step status="finish" title="Login" icon={<UserOutlined />} />
          <Step status="process" title="Information" icon={<InfoCircleTwoTone />} />
          <Step status="finish" title="Upload" icon={<UploadOutlined />} />
          <Step status="wait" title="Done" icon={<SmileOutlined />} />
        </Steps>
      </Header>
      <Content>{getBody()}</Content>
      <Footer>
        {currentStep !== 1 && (
          <Button type="primary" onClick={() => updateStep(-1)}>
            Previous
          </Button>
        )}
        <Button type="primary" onClick={() => updateStep(1)}>
          {currentStep === NUM_STEPS ? "Done" : "Next"}
        </Button>
      </Footer>
    </div>
  );
}

export default SellStream;
