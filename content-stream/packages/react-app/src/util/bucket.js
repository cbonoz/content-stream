// https://docs.textile.io/tutorials/hub/user-buckets/
import { Client, Buckets, PrivateKey } from "@textile/hub";

const getIdentity = async () => {
  /** Restore any cached user identity first */
  const cached = localStorage.getItem("user-private-identity");
  if (cached !== null) {
    /** Convert the cached identity string to a PrivateKey and return */
    return PrivateKey.fromString(cached);
  }
  /** No cached identity existed, so create a new one */
  const identity = await PrivateKey.fromRandom();
  /** Add the string copy to the cache */
  localStorage.setItem("user-private-identity", identity.toString());
  /** Return the random identity */
  return identity;
};

const keyInfo = { key: process.env.REACT_APP_TEXTILE_KEY };
console.log("key", keyInfo);
if (!keyInfo.key) {
  throw Error("No TEXTILE_KEY found");
}

export async function authorize() {
  const client = await Client.withKeyInfo(keyInfo);
  await client.getToken(await getIdentity());
  return client;
}

export const getOrCreateBucket = async bucketName => {
  // Use the insecure key to set up the buckets client
  const buckets = await Buckets.withKeyInfo(keyInfo);
  // Authorize the user and your insecure keys with getToken
  await buckets.getToken(await getIdentity());

  const { root, threadID } = await buckets.getOrCreate(bucketName);
  if (!root) throw new Error("bucket not created");
  const bucketKey = root.key;
  return { buckets, bucketKey, threadId: threadID };
};

export const getLinks = async (bucketName, bucketKey) => {
  const buckets = await Buckets.withKeyInfo(keyInfo);
  await buckets.getToken(await getIdentity());
  const { root, threadID } = await buckets.getOrCreate(bucketName);
  console.log("bucket", buckets, bucketKey, root, threadID);
  const links = await buckets.links(bucketKey || root.key);
  console.log(links);
  return links;
};

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

export const createBucketWithFiles = async (bucketName, files) => {
  const { buckets, bucketKey } = await getOrCreateBucket(bucketName);
  for (let i in files) {
    const fileName = files[i].name;
    await insertFile(buckets, bucketKey, files[i], fileName);
  }

  console.log("createBucket", bucketName, files, bucketKey);

  return { buckets, bucketKey };
};
