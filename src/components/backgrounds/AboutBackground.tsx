"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);
    const particleCount = 5000;

    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Random positions in sphere
            const radius = Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Teal to amber gradient
            const color = new THREE.Color();
            color.setHSL(
                0.5 + Math.random() * 0.1, // Hue (teal-ish)
                0.7,
                0.5 + Math.random() * 0.2
            );
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            // Slow rotation
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        }
    });

    return (
        <Points ref={pointsRef} positions={particles.positions} colors={particles.colors}>
            <PointMaterial
                transparent
                size={0.02}
                sizeAttenuation
                depthWrite={false}
                vertexColors
                opacity={0.8}
            />
        </Points>
    );
}

export function AboutBackground() {
    return (
        <div className="fixed inset-0 z-[-1]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ParticleField />
            </Canvas>
        </div>
    );
}
