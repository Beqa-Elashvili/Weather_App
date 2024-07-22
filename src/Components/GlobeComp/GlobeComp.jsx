import React from "react";
import Globe from "react-globe.gl";
import { useRef } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";

function GlobeComp() {
  const globeRef = useRef();
  const { loading } = useGlobalProvider();

  const startAutoRotate = () => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1;
    }
  };

  return (
    <div>
      <div className="hidden lg:block">
        <Globe
          ref={globeRef}
          height={50}
          width={50}
          waitForGlobeReady={loading}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          backgroundColor="rgba(0, 0, 0, 0)"
          enableRotation={true}
          onGlobeReady={() => startAutoRotate()}
        />
      </div>
    </div>
  );
}

export default GlobeComp;
