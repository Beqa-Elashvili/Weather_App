import React, { useRef } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import GlobeComp from "../GlobeComp/GlobeComp";

const VideoBackground = ({ children }) => {
  const { weather } = useGlobalProvider();
  const videoRef = useRef(null);
  return (
    <div>
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          src={weather}
          className="absolute w-full object-cover z-0"
        />
        <div className="absolute inset-20 flex justify-center">
          <GlobeComp />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default VideoBackground;
