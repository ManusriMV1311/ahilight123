"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingData() {
    const groupRef = useRef<THREE.Group>(null);

    const dataPoints = useMemo(() => {
        const points = [];
        for (let i = 0; i < 50; i++) {
            points.push({
                position: [
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                ] as [number, number, number],
                value: Math.floor(Math.random() * 100),
                speed: Math.random() * 0.5 + 0.2,
            });
        }
        return points;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {dataPoints.map((point, idx) => (
                <group key={idx} position={point.position}>
                    {/* Bar chart column */}
                    <mesh position={[0, point.value / 100, 0]}>
                        <boxGeometry args={[0.2, point.value / 50, 0.2]} />
                        <meshStandardMaterial
                            color="#00d4aa"
                            emissive="#00d4aa"
                            emissiveIntensity={0.3}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>

                    {/* Number label */}
                    <Text
                        position={[0, point.value / 50 + 0.5, 0]}
                        fontSize={0.3}
                        color="#00d4aa"
                        anchorX="center"
                    >
                        {point.value}
                    </Text>
                </group>
            ))}
        </group>
    );
}

export function ResearchBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020617]">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00d4aa" />
                <FloatingData />
            </Canvas>
        </div>
    );
}
