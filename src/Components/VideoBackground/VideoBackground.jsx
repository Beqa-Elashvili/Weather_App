import React, { useRef } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import GlobeComp from "../GlobeComp/GlobeComp";
import ReactPlayer from "react-player";

const VideoBackground = ({ children }) => {
  const { weather, loading } = useGlobalProvider();
  const videoRef = useRef(null);
  return (
    <div className="relative h-full">
      <div>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          src={weather}
          className="absolute w-full h-full z-0 object-cover"
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
