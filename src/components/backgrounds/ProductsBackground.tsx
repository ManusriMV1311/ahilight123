"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function ProductGeometry({ position, geometry }: { position: [number, number, number], geometry: 'box' | 'sphere' | 'torus' }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    const GeometryComponent = {
        box: Box,
        sphere: Sphere,
        torus: Torus,
    }[geometry];

    return (
        <group position={position}>
            <GeometryComponent ref={meshRef} args={geometry === 'box' ? [1, 1, 1] : geometry === 'sphere' ? [0.6, 32, 32] : [0.6, 0.2, 16, 32]}>
                <meshStandardMaterial
                    color="#00d4aa"
                    metalness={0.9}
                    roughness={0.1}
                    wireframe={false}
                    emissive="#00d4aa"
                    emissiveIntensity={0.2}
                />
            </GeometryComponent>

            {/* Pedestal */}
            <Box args={[1.5, 0.1, 1.5]} position={[0, -1, 0]}>
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </Box>
        </group>
    );
}

function ProductShowcase() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.3} intensity={1} color="#00d4aa" />
            <spotLight position={[-10, 10, -10]} angle={0.3} intensity={0.5} />

            <ProductGeometry position={[-3, 0, 0]} geometry="box" />
            <ProductGeometry position={[0, 0, 0]} geometry="sphere" />
            <ProductGeometry position={[3, 0, 0]} geometry="torus" />
        </>
    );
}

export function ProductsBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                <color attach="background" args={['#000000']} />
                <ProductShowcase />
            </Canvas>
        </div>
    );
}
