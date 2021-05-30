import React, { useState } from "react";
import { Button, Input } from "antd";
import { getLinks } from "../../util/bucket";

function Access(props) {
  const [key, setKey] = useState("Testbucket");
  const [links, setLinks] = useState({});
  const [error, setError] = useState("");
  const search = async () => {
    setError("");
    let res;
    try {
      res = await getLinks(key);
    } catch (e) {
      setError("Access denied - your name or key may be incorrect.");
    }
    if (!res) {
      setError("We could not find that key.");
    } else {
      setLinks(res);
    }
  };
  return (
    <div>
      <h3>Unlock your purchased streams</h3>
      <p>Enter bucket key below:</p>
      <Input value={key} onChange={e => setKey(e.target.value)} placeholder="Enter key" />
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
