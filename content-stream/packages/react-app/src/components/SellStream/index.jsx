import React, { useState, useEffect } from "react";
import { Steps } from "antd";

import { Layout } from "antd";
import { Button, Radio } from "antd";
import { StreamDropzone } from "../StreamDropzone";
import { Input } from "antd";
import { createBucketWithFiles } from "../../util/bucket";

const { Header, Footer, Sider, Content } = Layout;

const { Step } = Steps;

const LAST_STEP = 3;

function SellStream({ isLoggedIn, signer, provider, address, blockExplorer }) {
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn && currentStep === 0) updateStep(1);
  }, [isLoggedIn]);

  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({ title: "Golf Broadcast from 5/28", eth: 0.01 });
  const [result, setResult] = useState({});

  const clearInfo = () => setInfo({});

  const updateInfo = update => {
    setInfo({ ...info, ...update });
  };

  const updateStep = async offset => {
    const newStep = currentStep + offset;
    if (newStep === LAST_STEP) {
      if (!files) {
        alert("At least one file must be added");
        return;
      }

      const res = await createBucketWithFiles(info.title, files);
      setResult(res);
    }

    console.log("update step", newStep);
    setCurrentStep(newStep);
  };

  const getBody = () => {
    switch (currentStep) {
      case 0: // confirm login
        return (
          <div>
            <h2>Login</h2>
            <p>
              In order to create a listing, you must login with your metamask or wallet account. Click 'connect' in the
              top right to begin.
            </p>
          </div>
        );
      case 1: // info
        return (
          <div className="info-section">
            <h2>What are you listing?</h2>
            <Input
              addonBefore={"Stream(s)"}
              placeholder="Enter name of listing"
              value={info.title}
              onChange={e => updateInfo({ title: e.target.value })}
            />
            <Input
              addonBefore={"Price (eth)"}
              placeholder="Enter eth price"
              value={info.eth}
              onChange={e => updateInfo({ eth: e.target.value })}
            />
            <Input addonBefore={"Address"} disabled placeholder="Payment Address: " value={address} />
            <p>Note: In order to sell a stream or stream package, it must be finished and as a recording. This recording will be secured and delivered via a special IPFS link.</p>
          </div>
        );
      case 2: // upload
        return (
          <div>
            <StreamDropzone files={files} setFiles={setFiles} />
          </div>
        );
      case 3: // done
        return (
          <div className="complete-section">
            <h1>Complete!</h1>
            {Object.keys(result).map(k => {
              return (
                <li>
                  {k}: {JSON.stringify(result[k])}
                </li>
              );
            })}
            <h3>Listing information</h3>
            {Object.keys(info).map(k => {
              return (
                <li key={k}>
                  {k}: {JSON.stringify(info[k]).replaceAll('"', "")}
                </li>
              );
            })}

            {result.url && (
              <a href={result.url} target="_blank">
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
          <Step title="Login" description="Authenticate." />
          <Step title="Information" description="What are you listing?" />
          <Step title="Upload" description="Add streams for sale." />
          <Step title="Done" description="View your listing." />
        </Steps>
      </Header>
      <Content>
        <div className="sell-area">{getBody()}</div>
      </Content>
      <Footer>
        {(currentStep !== 0 || (currentStep !== 1 && !isLoggedIn)) && (
          <Button type="primary" onClick={() => updateStep(-1)}>
            Previous
          </Button>
        )}
        {currentStep < LAST_STEP && (
          <Button type="primary" onClick={() => updateStep(1)}>
            {currentStep === LAST_STEP - 1 ? "Done" : "Next"}
          </Button>
        )}
      </Footer>
    </div>
  );
}

export default SellStream;
