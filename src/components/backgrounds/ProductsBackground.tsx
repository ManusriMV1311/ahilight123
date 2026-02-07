"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { MeshReflectorMaterial } from '@react-three/drei';

// Ripple source component
function RippleSource({ position, startDelay }: { position: [number, number, number], startDelay: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime - startDelay;

        if (t < 0) return;

        // Pulsing ripple source
        const pulse = Math.sin(t * 2) * 0.5 + 0.5;
        meshRef.current.scale.setScalar(0.2 + pulse * 0.3);

        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = pulse * 3;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
                color="#00F2FF"
                emissive="#00F2FF"
                emissiveIntensity={2}
                toneMapped={false}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
}

// Liquid mirror surface with ripples
function LiquidMirror() {
    const meshRef = useRef<THREE.Mesh>(null);
    const noise3D = useMemo(() => createNoise3D(), []);

    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(40, 40, 120, 120);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position;
        const time = state.clock.elapsedTime;

        // Create multiple ripple points
        const ripplePoints = [
            { x: 5, z: -3, phase: 0 },
            { x: -7, z: 5, phase: 1.5 },
            { x: 3, z: 8, phase: 3 },
            { x: -8, z: -6, phase: 4.5 },
        ];

        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const z = positions.getY(i);

            let y = 0;

            // Add ripples from multiple sources
            ripplePoints.forEach(ripple => {
                const dx = x - ripple.x;
                const dz = z - ripple.z;
                const dist = Math.sqrt(dx * dx + dz * dz);
                const rippleSpeed = 2;
                const rippleFreq = 0.5;

                // Expanding ripple waves
                const wave = Math.sin(dist * rippleFreq - time * rippleSpeed + ripple.phase) / (1 + dist * 0.3);
                y += wave * 0.5;
            });

            // Add subtle noise for organic feel
            const noiseValue = noise3D(x * 0.1, z * 0.1, time * 0.2) * 0.1;
            y += noiseValue;

            positions.setZ(i, y);
        }

        positions.needsUpdate = true;
        meshRef.current.geometry.computeVertexNormals();
    });

    return (
        <mesh
            ref={meshRef}
            geometry={geometry}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2, 0]}
        >
            <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={512}
                mixBlur={1}
                mixStrength={50}
                roughness={0.1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#1a0a2e"
                metalness={0.8}
                mirror={0.8}
            />
        </mesh>
    );
}

// Floating caustic light particles
function CausticParticle({ position, index }: { position: [number, number, number], index: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;

        // Floating motion
        meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.5;
        meshRef.current.position.x = position[0] + Math.cos(t * 0.3 + index) * 0.3;

        // Pulsing glow
        const pulse = Math.sin(t * 2 + index * 0.5) * 0.5 + 0.5;
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = pulse * 2;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
                color={index % 2 === 0 ? "#7D5FFF" : "#00F2FF"}
                emissive={index % 2 === 0 ? "#7D5FFF" : "#00F2FF"}
                emissiveIntensity={1.5}
                toneMapped={false}
                transparent
                opacity={0.6}
            />
        </mesh>
    );
}

export function ProductsBackground() {
    const [mounted, setMounted] = useState(false);

    // Generate caustic particles - must be before any conditional returns
    const causticParticles = useMemo(() => {
        const particles = [];
        for (let i = 0; i < 30; i++) {
            particles.push({
                position: [
                    (Math.random() - 0.5) * 15,
                    Math.random() * 8 - 1,
                    (Math.random() - 0.5) * 15
                ] as [number, number, number],
                index: i
            });
        }
        return particles;
    }, []);

    // Ripple source positions
    const rippleSources: [number, number, number][] = useMemo(() => [
        [5, 0.5, -3],
        [-7, 0.5, 5],
        [3, 0.5, 8],
        [-8, 0.5, -6],
    ], []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="fixed inset-0 z-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>
    );

    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas
                camera={{ position: [0, 5, 12], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <color attach="background" args={['#0a0118']} />

                {/* Cinematic lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[0, 10, 0]} intensity={1} color="#ffffff" />
                <pointLight position={[10, 5, 5]} intensity={0.8} color="#7D5FFF" />
                <pointLight position={[-10, 5, -5]} intensity={0.6} color="#00F2FF" />

                {/* Liquid mirror surface */}
                <LiquidMirror />

                {/* Ripple sources */}
                {rippleSources.map((pos, i) => (
                    <RippleSource key={`ripple-${i}`} position={pos} startDelay={i * 0.5} />
                ))}

                {/* Caustic particles */}
                {causticParticles.map((particle) => (
                    <CausticParticle
                        key={`particle-${particle.index}`}
                        position={particle.position}
                        index={particle.index}
                    />
                ))}

                {/* Fog for atmosphere */}
                <fog attach="fog" args={['#0a0118', 10, 30]} />
            </Canvas>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
        </div>
    );
}
