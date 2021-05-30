import React, { useState } from "react";
import { Button, Input } from "antd";
import { getLinks } from "../../util/bucket";

function Access(props) {
  const [key, setKey] = useState("bafzbeiafmqf335n3xigktpd6cvkno3md7353hc5zhtpu2censhivu6udxq");
  const [name, setName] = useState("Testbucket");
  const [links, setLinks] = useState({});
  const [error, setError] = useState("");
  const search = async () => {
    setError("");
    let res;
    try {
      res = await getLinks(name, key);
    } catch (e) {
      setError("Access denied - your name or lookup key may be incorrect.");
    }
    if (!res) {
      setError("Access denied - your name or lookup key may be incorrect.");
      setLinks({});
    } else {
      setLinks(res);
    }
  };
  return (
    <div>
      <br />
      <h3>Unlock your purchased streams</h3>
      <p>Enter stream name and access key below:</p>
      <div>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
      </div>
      <div>
        <Input value={key} onChange={e => setKey(e.target.value)} placeholder="Enter key" />
      </div>
      <Button onClick={search}>Lookup</Button>
      <div>
        {error && <p>{error}</p>}
        {links.url && (
          <div>
            <a href={links.url} target="_blank">
              Access contents
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Access;
