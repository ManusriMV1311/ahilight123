"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

// Neural node component
function NeuralNode({ position, index }: { position: [number, number, number], index: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const [energy, setEnergy] = useState(0);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;

        // Pulsing energy based on sine wave
        const pulse = Math.sin(t * 2 + index * 0.5) * 0.5 + 0.5;
        setEnergy(pulse);

        // Gentle floating motion
        meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.1;

        // Update light intensity
        if (lightRef.current) {
            lightRef.current.intensity = pulse * 2;
        }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color={energy > 0.5 ? "#00F2FF" : "#7D5FFF"}
                    emissive={energy > 0.5 ? "#00F2FF" : "#7D5FFF"}
                    emissiveIntensity={energy * 2}
                    toneMapped={false}
                />
            </mesh>
            <pointLight
                ref={lightRef}
                color={energy > 0.5 ? "#00F2FF" : "#7D5FFF"}
                intensity={energy * 2}
                distance={3}
            />
        </group>
    );
}

// Neural pathway connection
function NeuralPathway({ start, end, index }: { start: [number, number, number], end: [number, number, number], index: number }) {
    const lineRef = useRef<THREE.Line>(null);
    const materialRef = useRef<THREE.LineBasicMaterial>(null);

    useFrame((state) => {
        if (!materialRef.current) return;
        const t = state.clock.elapsedTime;

        // Pulsing opacity for energy flow effect
        const pulse = Math.sin(t * 3 + index * 0.3) * 0.3 + 0.5;
        materialRef.current.opacity = pulse * 0.6;
    });

    const points = useMemo(() => {
        // Create curved path between nodes
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start),
            new THREE.Vector3(
                (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 2,
                (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 2,
                (start[2] + end[2]) / 2 + (Math.random() - 0.5) * 2
            ),
            new THREE.Vector3(...end)
        );
        return curve.getPoints(20);
    }, [start, end]);

    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        return geom;
    }, [points]);

    return (
        <line ref={lineRef} geometry={geometry}>
            <lineBasicMaterial
                ref={materialRef}
                color="#7D5FFF"
                transparent
                opacity={0.4}
                linewidth={2}
            />
        </line>
    );
}

// Main neural network scene
function NeuralNetwork() {
    const nodeCount = 25;

    const nodes = useMemo(() => {
        const positions: [number, number, number][] = [];
        for (let i = 0; i < nodeCount; i++) {
            positions.push([
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 15 - 5
            ]);
        }
        return positions;
    }, []);

    const connections = useMemo(() => {
        const conns: { start: [number, number, number], end: [number, number, number] }[] = [];
        // Connect each node to 2-3 nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            const distances = nodes.map((node, j) => ({
                index: j,
                dist: Math.sqrt(
                    Math.pow(node[0] - nodes[i][0], 2) +
                    Math.pow(node[1] - nodes[i][1], 2) +
                    Math.pow(node[2] - nodes[i][2], 2)
                )
            }))
                .filter(d => d.index !== i)
                .sort((a, b) => a.dist - b.dist)
                .slice(0, 3);

            distances.forEach(d => {
                if (Math.random() > 0.3) {
                    conns.push({ start: nodes[i], end: nodes[d.index] });
                }
            });
        }
        return conns;
    }, [nodes]);

    return (
        <>
            {/* Render pathways */}
            {connections.map((conn, i) => (
                <NeuralPathway
                    key={`path-${i}`}
                    start={conn.start}
                    end={conn.end}
                    index={i}
                />
            ))}

            {/* Render nodes */}
            {nodes.map((pos, i) => (
                <NeuralNode key={`node-${i}`} position={pos} index={i} />
            ))}
        </>
    );
}

export function ProductsBackground() {
    const [mounted, setMounted] = useState(false);

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
                camera={{ position: [0, 0, 12], fov: 60 }}
                style={{ background: 'transparent' }}
            >
                <color attach="background" args={['#0a0118']} />

                {/* Ambient lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#7D5FFF" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00F2FF" />

                {/* Neural network */}
                <NeuralNetwork />

                {/* Fog for depth */}
                <fog attach="fog" args={['#0a0118', 8, 25]} />
            </Canvas>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
        </div>
    );
}
