"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CentralSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]}>
            <MeshDistortMaterial
                color="#00d4aa"
                emissive="#00d4aa"
                emissiveIntensity={0.5}
                distort={0.3}
                speed={1.5}
                roughness={0}
                metalness={0.8}
            />
        </Sphere>
    );
}

export function ContactBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black opacity-30">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <CentralSphere />
            </Canvas>
        </div>
    );
}
