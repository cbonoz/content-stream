import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

let hls;

export default function VideoPlayer({ url }) {
  const videoRef = useRef(null);
  const src = url || "http://localhost:8935/stream/current.m3u8";

  const load = () => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Some browers (safari and ie edge) support HLS natively
        video.src = src;
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else {
        console.error("This is a legacy browser that doesn't support MSE");
      }
    }
  };

  useEffect(() => {
    if (url.indexOf("m3u8") !== -1) {
      load();
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoRef, url]);

  return <video controls ref={videoRef} style={{ width: "100%", maxWidth: "500px" }} />;
}
