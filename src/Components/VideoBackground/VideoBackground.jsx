import React, { useRef } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";

const VideoBackground = ({ children }) => {
  const { weather } = useGlobalProvider();
  const videoRef = useRef(null);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        src={weather}
        className="absolute w-full z-0"
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export default VideoBackground;
