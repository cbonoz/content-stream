// https://docs.textile.io/tutorials/hub/user-buckets/
import { Buckets, PushPathResult } from "@textile/hub";
import { Client, Identity, KeyInfo } from "@textile/hub";

export async function authorize(key, identity) {
  const client = await Client.withKeyInfo(key);
  await client.getToken(identity);
  return client;
}

export const insertFile = (buckets, bucketKey, file, path) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => reject("file reading was aborted");
    reader.onerror = () => reject("file reading has failed");
    reader.onload = () => {
      const binaryStr = reader.result;
      // Finally, push the full file to the bucket
      buckets.pushPath(bucketKey, path, binaryStr).then(raw => {
        resolve(raw);
      });
    };
    reader.readAsArrayBuffer(file);
  });
};
