import { Container, Slider } from "@mui/material";
import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC, useState } from "react";
import * as THREE from "three";
import { imaginaryPart, realPart } from "../src/components/functions/functions";
import CurvePlotter2D from "../src/components/plots/CurvePlotter2D";

const CubeView: FC<{ limit: number }> = ({ limit }) => {
  const numPoints = 200;
  const minPoint = 0;
  const maxPoint = 5;

  const width = 500;
  const height = 300;

  const xPoints = [];

  for (let i = 0; i < numPoints; i++) {
    const x = minPoint + (maxPoint - minPoint) * (i / (numPoints - 1));
    if (x > limit) break;
    xPoints.push(x);
  }

  const yRealPoints = xPoints.map((x) => realPart(x));
  const yImaginaryPoints = xPoints.map((x) => imaginaryPart(x));

  const curve3dPoints = xPoints.map((x, i) => {
    const xs = x * (maxPoint / (width / 200)) - width / 100;
    const y = yRealPoints[i] * ((width / height) * 1.3);
    const z = -yImaginaryPoints[i] * ((width / height) * 1.3);
    return new THREE.Vector3(xs, y, z);
  });

  const curve = new THREE.CatmullRomCurve3(
    curve3dPoints.length > 2
      ? curve3dPoints
      : [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]
  );

  const axis = new THREE.CatmullRomCurve3(
    curve3dPoints.length > 2
      ? [
          curve3dPoints[0],
          new THREE.Vector3(
            limit * (maxPoint / (width / 200)) - width / 100,
            0,
            0
          ),
        ]
      : [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]
  );

  const radius = new THREE.CatmullRomCurve3(
    curve3dPoints.length > 2
      ? [
          new THREE.Vector3(curve3dPoints[curve3dPoints.length - 1].x, 0, 0),
          curve3dPoints[curve3dPoints.length - 1],
        ]
      : [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]
  );

  const tubeGeometry = new THREE.TubeGeometry(
    curve,
    numPoints,
    0.01,
    200,
    false
  );
  const axisGeometry = new THREE.TubeGeometry(axis, numPoints, 0.01, 2, false);
  const radiusGeometry = new THREE.TubeGeometry(
    radius,
    numPoints,
    0.01,
    2,
    false
  );

  return (
    <group>
      {/* Left Face */}
      <mesh position={[0, 0, 0]}>
        <Html position={[0, 0, -width / 100]} transform occlude>
          <div style={{ width: width, height: height }}>
            <CurvePlotter2D
              xPoints={xPoints}
              yPoints={yRealPoints}
              width={width}
              height={height}
              min={minPoint}
              max={maxPoint}
            />
          </div>
        </Html>
      </mesh>

      {/* Right Face */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
        <Html position={[0, 0, -(width + height) / 100]} transform occlude>
          <div style={{ width: height, height: height }}>
            <CurvePlotter2D
              xPoints={yImaginaryPoints}
              yPoints={yRealPoints}
              width={height}
              height={height}
              min={-1}
              max={1}
            />
          </div>
        </Html>
      </mesh>
      {/* Bottom Face */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <Html position={[0, 0, -width / 100]} transform occlude>
          <div style={{ width: width, height: height }}>
            <CurvePlotter2D
              xPoints={xPoints}
              yPoints={yImaginaryPoints}
              width={width}
              height={height}
              min={minPoint}
              max={maxPoint}
            />
          </div>
        </Html>
      </mesh>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh geometry={axisGeometry}>
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh geometry={radiusGeometry}>
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

const IndexPage = () => {
  const [limit, setLimit] = useState(0);

  return (
    <Container maxWidth="lg">
      <Slider
        onChange={(e, v) => setLimit(v as number)}
        min={0}
        max={5}
        step={0.01}
      />

      <Canvas
        camera={{
          position: [10, 10, 10],
          fov: 50,
          rotation: [Math.PI / 4, Math.PI / 4, 0],
        }}
        style={{ height: "80vh" }}
      >
        <directionalLight position={[5, 5, 5]} />
        <CubeView limit={limit} />
        <OrbitControls />
      </Canvas>
    </Container>
  );
};

export default IndexPage;
