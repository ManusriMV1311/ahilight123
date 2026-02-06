"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SharedUniverse } from "./common/SharedUniverse";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

interface DomainProps {
    text: string;
    targetPosition: [number, number, number];
    delay: number;
    color: string;
}

function KiteDomain({ text, targetPosition, delay, color }: DomainProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [startAnim] = useState(() => Math.random() * 100);
    const [currentPos, setCurrentPos] = useState<[number, number, number]>([0, 0, 0]);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;
        // Pop out animation
        const progress = Math.min(Math.max((time - delay) * 0.5, 0), 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out

        // Orbit animation
        const orbitSpeed = 0.2;
        const angle = time * orbitSpeed + startAnim;
        const radius = 4.5 * eased;

        // Combine orbit with initial position direction
        const finalX = Math.sin(angle) * radius * targetPosition[0];
        const finalZ = Math.cos(angle) * radius * targetPosition[2];
        const finalY = (Math.sin(angle * 0.5) * 2 + targetPosition[1]) * eased;

        groupRef.current.position.set(finalX, finalY, finalZ);
        groupRef.current.scale.setScalar(eased);
        groupRef.current.lookAt(0, 0, 0);

        // Update current position state for line
        setCurrentPos([finalX, finalY, finalZ]);
    });

    return (
        <>
            <group ref={groupRef} scale={0}>
                {/* Kite Shape (Rotated Octahedron/Plane) */}
                <group rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                    <mesh>
                        <octahedronGeometry args={[0.3, 0]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={0.5}
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </mesh>
                    {/* Wireframe overlay */}
                    <mesh scale={1.05}>
                        <octahedronGeometry args={[0.3, 0]} />
                        <meshBasicMaterial
                            color="#ffffff"
                            wireframe
                            transparent
                            opacity={0.3}
                        />
                    </mesh>
                </group>

                {/* Text Label */}
                <Text
                    position={[0, -0.5, 0]}
                    font="/fonts/SpaceGrotesk-Bold.ttf"
                    fontSize={0.3}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="top"
                    outlineWidth={0.02}
                    outlineColor={color}
                    outlineOpacity={0.2}
                >
                    {text}
                </Text>
            </group>

            {/* Connectivity Line */}
            <Line
                points={[[0, 0, 0], currentPos]}
                color={color}
                lineWidth={1}
                transparent
                opacity={0.3}
            />
        </>
    );
}

function LivingCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }
        if (materialRef.current) {
            materialRef.current.distort = 0.4 + Math.sin(time) * 0.1;
        }
    });

    return (
        <group position={[0, 1.5, 0]}>
            <mesh ref={meshRef} scale={1.8}>
                <icosahedronGeometry args={[1, 6]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0}
                    distort={0.4}
                    transparent={true}
                    opacity={0.1}
                />
            </mesh>

            <Text
                position={[0.02, -0.02, -0.05]}
                fontSize={0.5}
                anchorX="center"
                anchorY="middle"
                characters="AhiLight"
                letterSpacing={0.05}
                font="/fonts/SpaceGrotesk-Bold.ttf"
                fontWeight={700}
                fillOpacity={0.5}
            >
                AhiLight
                <meshStandardMaterial
                    color="#000000"
                    emissive="#000000"
                    roughness={1}
                />
            </Text>

            <Text
                position={[0, 0, 0]}
                fontSize={0.5}
                anchorX="center"
                anchorY="middle"
                characters="AhiLight"
                letterSpacing={0.05}
                font="/fonts/SpaceGrotesk-Bold.ttf"
                fontWeight={700}
            >
                AhiLight
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#00ffff"
                    emissiveIntensity={2.0}
                    roughness={0}
                    metalness={0.1}
                    toneMapped={false}
                />
            </Text>
        </group>
    );
}

function PopOutDomains() {
    const domains = [
        "Cyber", "AI", "Blockchain", "AR/VR",
        "IoT", "Cloud", "Quantum", "Data",
        "BioTech", "Robotics", "Space", "Energy"
    ];

    const domainObjects = useMemo(() => {
        return domains.map((domain, i) => {
            const phi = Math.acos(-1 + (2 * i) / domains.length);
            const theta = Math.sqrt(domains.length * Math.PI) * phi;

            return {
                text: domain,
                targetPosition: [
                    Math.cos(theta) * Math.sin(phi),
                    Math.sin(theta) * Math.sin(phi),
                    Math.cos(phi)
                ] as [number, number, number],
                delay: i * 0.2 + 1,
                color: i % 2 === 0 ? "#00d4ff" : "#6366f1"
            };
        });
    }, []);

    return (
        <group>
            {domainObjects.map((props, i) => (
                <KiteDomain key={i} {...props} />
            ))}
        </group>
    );
}

export function HomeBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: false }}>
                <SharedUniverse />

                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <LivingCore />
                </Float>

                <PopOutDomains />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.5}
                        mipmapBlur
                        intensity={1.2}
                        radius={0.6}
                    />
                </EffectComposer>
            </Canvas>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/50" />
        </div>
    );
}
