"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { SharedUniverse } from "./common/SharedUniverse";
import { Float } from '@react-three/drei';

function GraduationCap({ position, rotation, scale, color, speed }: { position: [number, number, number], rotation: [number, number, number], scale: number, color: string, speed: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Float upwards
        groupRef.current.position.y += speed * 0.01;

        // Reset if out of view
        if (groupRef.current.position.y > 10) {
            groupRef.current.position.y = -10;
        }

        // Gentle rotation
        groupRef.current.rotation.x += speed * 0.005;
        groupRef.current.rotation.y += speed * 0.01;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Board (Top Square) */}
                <mesh position={[0, 0.1, 0]}>
                    <boxGeometry args={[1.2, 0.1, 1.2]} />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
                </mesh>

                {/* Skull Cap (Base Cylinder) */}
                <mesh position={[0, -0.15, 0]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
                </mesh>

                {/* Tassel Button */}
                <mesh position={[0, 0.16, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
                    <meshStandardMaterial color="#fbbf24" /> {/* Gold Button */}
                </mesh>

                {/* Tassel String */}
                <mesh position={[0.3, 0.1, 0.3]} rotation={[0, 0, -0.5]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
                    <meshStandardMaterial color="#fbbf24" /> {/* Gold Tassel */}
                </mesh>
            </Float>
        </group>
    );
}

function FloatingCaps({ count = 40 }: { count?: number }) {
    // Generate random data for caps
    const caps = useMemo(() => {
        const temp = [];
        const palette = [
            '#06b6d4', // Cyan
            '#3b82f6', // Blue
            '#a855f7', // Purple
            '#1e293b'  // Dark Navy/Slate
        ];

        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 25,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10
                ] as [number, number, number],
                rotation: [
                    Math.random() * 0.5,
                    Math.random() * Math.PI,
                    Math.random() * 0.5
                ] as [number, number, number],
                scale: 0.3 + Math.random() * 0.3,
                color: palette[Math.floor(Math.random() * palette.length)],
                speed: 0.5 + Math.random() * 1.5
            });
        }
        return temp;
    }, [count]);

    return (
        <group>
            {caps.map((cap, i) => (
                <GraduationCap key={i} {...cap} />
            ))}
        </group>
    );
}

export function CareersBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-deep-navy">
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -5, -10]} intensity={0.5} color="#06b6d4" />
                <SharedUniverse />
                <FloatingCaps />
            </Canvas>
            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-deep-navy opacity-80" />
        </div>
    );
}
