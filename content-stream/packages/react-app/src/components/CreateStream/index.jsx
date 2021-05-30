import { Button, Input } from "antd";
import React, { useState } from "react";
import { postStream } from "../../api";
import StreamCard from "../StreamCard";
import VideoPlayer from "../VideoPlayer";

const defaultUrl =
  "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8";

function CreateStream(props) {
  const [url, setUrl] = useState(defaultUrl);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const create = async () => {
    setLoading(true);
    try {
      const res = await postStream(name);
      setData(res.data);
    } catch (e) {
      console.error("error creating stream", e);
      alert(e.toString());
    }
    setLoading(false);
  };
  return (
    <div className="content">
      <h2>Create Stream</h2>
      <Input placeholder="Enter stream name" value={name} onChange={e => setName(e.target.value)} />
      <Button loading={loading} onClick={create}>
        Start new stream
      </Button>
      <div className="align-left">
        {data &&
          Object.keys(data).map(k => {
            return (
              <li key={k}>
                {k}: {JSON.stringify(data[k]).replaceAll('"', "")}
              </li>
            );
          })}
      </div>
      <p>
        <hr />
        Use this created stream information to plug into your favorite streaming system such as{" "}
        <a href="https://obsproject.com/" target="_blank">
          OBS
        </a>
        . Once complete, you can use ContentStream to transform that finished stream into a sellable or tradeable asset.
      </p>
      {/* <h2>Or view an existing stream</h2>
      <Input placeholder="Enter stream url or known playback ID" value={url} onChange={e => setUrl(e.target.value)} />
      <br />
      <VideoPlayer url={url} /> */}
    </div>
  );
}

export default CreateStream;
