"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Brand gradient stops — --grad: linear-gradient(115deg, #8c59fe, #597aff 38%, #00c4b3 72%, #ace738)
const BRAND = ["#8c59fe", "#597aff", "#00c4b3", "#ace738"];

const SHAPE_DEFS = [
  { geometry: () => new THREE.TorusGeometry(1, 0.4, 24, 64), position: [-5.5, 2.2, -3], scale: 1.1 },
  { geometry: () => new THREE.IcosahedronGeometry(1.3, 0), position: [5.8, -1.4, -4], scale: 1 },
  { geometry: () => new THREE.SphereGeometry(1, 32, 32), position: [-6, -3, -6], scale: 0.85 },
  { geometry: () => new THREE.CapsuleGeometry(0.6, 1.6, 4, 12), position: [6.2, 3, -5], scale: 1 },
];

function Shapes({ scrollFracRef, targetOpacityRef }) {
  const group = useRef();
  const opacityRef = useRef(0);
  const shapes = useMemo(
    () =>
      SHAPE_DEFS.map((def, i) => ({
        ...def,
        geometry: def.geometry(),
        color: BRAND[i],
      })),
    []
  );

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const s = scrollFracRef.current || 0;
    g.rotation.y += delta * 0.02;
    g.position.y = -s * 4;

    opacityRef.current += (targetOpacityRef.current - opacityRef.current) * Math.min(delta * 2, 1);
    g.traverse((obj) => {
      if (obj.material) obj.material.opacity = opacityRef.current;
    });
  });

  return (
    <group ref={group}>
      {shapes.map((cfg, i) => (
        <Float key={i} speed={1 + i * 0.2} floatIntensity={1.2} rotationIntensity={0.4}>
          <mesh position={cfg.position} scale={cfg.scale} geometry={cfg.geometry}>
            <MeshDistortMaterial
              color={cfg.color}
              distort={0.3}
              speed={1.2}
              transparent
              opacity={0}
              emissive={cfg.color}
              emissiveIntensity={0.15}
              roughness={0.35}
              metalness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function SceneBackground({ scrollFracRef, targetOpacity = 0 }) {
  const [lost, setLost] = useState(false);
  const targetOpacityRef = useRef(targetOpacity);
  targetOpacityRef.current = targetOpacity;

  if (lost) return null;

  return (
    <div className="scene-bg" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 40 }}
        gl={{ alpha: true, antialias: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setLost(true);
            },
            false
          );
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#8c59fe" />
        <pointLight position={[-5, -3, 4]} intensity={0.4} color="#00c4b3" />
        <Shapes scrollFracRef={scrollFracRef} targetOpacityRef={targetOpacityRef} />
      </Canvas>
    </div>
  );
}
