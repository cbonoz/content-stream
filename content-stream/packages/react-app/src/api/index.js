import axios from "axios";

const LIVEPEER_KEY = process.env.REACT_APP_LIVEPEER_KEY;
console.log("lp", LIVEPEER_KEY);

const instance = axios.create({
  baseURL: "https://livepeer.com",
  timeout: 6000,
  headers: { Authorization: "Bearer " + LIVEPEER_KEY },
});

export const postStream = name => {
  const data = {
    name,
    profiles: [
      {
        name: "720p",
        bitrate: 2000000,
        fps: 30,
        width: 1280,
        height: 720,
      },
      {
        name: "480p",
        bitrate: 1000000,
        fps: 30,
        width: 854,
        height: 480,
      },
      {
        name: "360p",
        bitrate: 500000,
        fps: 30,
        width: 640,
        height: 360,
      },
    ],
  };
  return instance.post("/api/stream", data);
};
