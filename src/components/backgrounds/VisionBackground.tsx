"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function StarField() {
    const starsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (!starsRef.current) return;
        // Forward motion through space
        starsRef.current.position.z = (state.clock.elapsedTime * 2) % 50 - 25;
    });

    return (
        <>
            <Stars
                ref={starsRef}
                radius={50}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
            <pointLight position={[0, 0, 0]} intensity={2} color="#00d4aa" />
        </>
    );
}

export function VisionBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#000814]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <color attach="background" args={['#000814']} />
                <StarField />
            </Canvas>
        </div>
    );
}
