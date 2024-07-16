import React, { useRef } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import GlobeComp from "../GlobeComp/GlobeComp";
import { useEffect } from "react";

const VideoBackground = ({ children }) => {
  const { weather } = useGlobalProvider();
  const videoRef = useRef(undefined);
  useEffect(() => {
    videoRef.current.defaultMuted = true;
  });

  console.log(weather);
  return (
    <div className="relative h-full">
      <div>
        <video
          ref={videoRef}
          autoPlay
          loop
          typeof="video/mp4"
          muted
          playsInline
          src={weather}
          className="absolute w-full h-full z-0 object-cover"
        >
          <source src={weather} type="video/mp4" />
        </video>
        <div className="absolute inset-20 flex justify-center">
          <GlobeComp />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default VideoBackground;
