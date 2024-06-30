import React from "react";
import Globe from "react-globe.gl";
import { useRef } from "react";

function GlobeComp() {
  const globeRef = useRef();

  const startAutoRotate = () => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1;
    }
  };

  return (
    <div>
      <Globe
        ref={globeRef}
        height={600}
        width={600}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        backgroundColor="rgba(0, 0, 0, 0)"
        enableRotation={true}
        onGlobeReady={() => startAutoRotate()}
      />
    </div>
  );
}

export default GlobeComp;
