"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Equation {
    text: string;
    position: [number, number, number];
    rotation: [number, number, number];
    velocity: { x: number; y: number; z: number };
    rotationSpeed: { x: number; y: number; z: number };
    scale: number;
    highlighted: boolean;
}

function FloatingEquations() {
    const groupRef = useRef<THREE.Group>(null);
    const equationCount = 40;

    const equations = useMemo<Equation[]>(() => {
        const formulas = [
            "E = mc²",
            "∂u/∂t = ∇²u",
            "∫∫∫ f(x,y,z) dV",
            "∇·E = ρ/ε₀",
            "H(x) = -Σ p(x)log p(x)",
            "f(x) = σ(Wx + b)",
            "||x||₂ = √(Σxᵢ²)",
            "∇f(x) = ∂f/∂x",
            "P(A|B) = P(B|A)P(A)/P(B)",
            "L = -Σ yᵢlog(ŷᵢ)",
            "det(A) = Σ aᵢⱼCᵢⱼ",
            "∇×B = μ₀J",
            "ℏω = E₂ - E₁",
            "ψ(x,t) = Ae^i(kx-ωt)",
            "∂²ψ/∂x² + k²ψ = 0",
            "F = ma",
            "Tr(AB) = Σ aᵢⱼbⱼᵢ",
            "∇·(∇f) = ∇²f",
            "δ(x) = ∫ e^(ikx)dk/2π",
            "λ = h/p",
        ];

        return Array.from({ length: equationCount }, (_, i) => ({
            text: formulas[i % formulas.length],
            position: [
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 25 - 5,
            ] as [number, number, number],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
            ] as [number, number, number],
            velocity: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.005,
            },
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.002,
                z: (Math.random() - 0.5) * 0.002,
            },
            scale: 0.8 + Math.random() * 0.6,
            highlighted: Math.random() > 0.85,
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        groupRef.current.children.forEach((child, i) => {
            const eq = equations[i];

            // Update position
            child.position.x += eq.velocity.x;
            child.position.y += eq.velocity.y;
            child.position.z += eq.velocity.z;

            // Update rotation
            child.rotation.x += eq.rotationSpeed.x;
            child.rotation.y += eq.rotationSpeed.y;
            child.rotation.z += eq.rotationSpeed.z;

            // Add gentle wave motion
            child.position.y += Math.sin(time * 0.5 + i * 0.3) * 0.002;

            // Boundary wrapping
            if (Math.abs(child.position.x) > 20) eq.velocity.x *= -1;
            if (Math.abs(child.position.y) > 12) eq.velocity.y *= -1;
            if (child.position.z > 10) eq.velocity.z = -Math.abs(eq.velocity.z);
            if (child.position.z < -20) eq.velocity.z = Math.abs(eq.velocity.z);

            // Occasional highlight toggle
            if (Math.random() > 0.998) {
                eq.highlighted = !eq.highlighted;
            }
        });
    });

    return (
        <group ref={groupRef}>
            {equations.map((eq, i) => (
                <Text
                    key={i}
                    position={eq.position}
                    rotation={eq.rotation}
                    fontSize={0.5 * eq.scale}
                    color={eq.highlighted ? "#00F2FF" : "#E0E0E0"}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={eq.highlighted ? 0.02 : 0}
                    outlineColor={eq.highlighted ? "#7D5FFF" : "#000000"}
                    fillOpacity={eq.highlighted ? 0.9 : 0.4}
                    font="/fonts/FiraMono-Regular.ttf"
                >
                    {eq.text}
                </Text>
            ))}
        </group>
    );
}

// Connection lines between related equations
function EquationConnections() {
    const linesRef = useRef<THREE.Group>(null);
    const connectionCount = 8;

    const connections = useMemo(() => {
        return Array.from({ length: connectionCount }, () => ({
            start: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 20,
            ],
            end: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 20,
            ],
            phase: Math.random() * Math.PI * 2,
        }));
    }, []);

    useFrame((state) => {
        if (!linesRef.current) return;
        const time = state.clock.getElapsedTime();

        linesRef.current.children.forEach((child, i) => {
            const material = (child as THREE.Line).material as THREE.LineBasicMaterial;
            const conn = connections[i];
            material.opacity = 0.1 + Math.sin(time + conn.phase) * 0.1;
        });
    });

    return (
        <group ref={linesRef}>
            {connections.map((conn, i) => {
                const points = [
                    new THREE.Vector3(...conn.start),
                    new THREE.Vector3(...conn.end),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);

                return (
                    <line key={i} geometry={geometry}>
                        <lineBasicMaterial color="#7D5FFF" transparent opacity={0.15} />
                    </line>
                );
            })}
        </group>
    );
}

export function AboutFlowingBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.3} />
                <FloatingEquations />
                <EquationConnections />
            </Canvas>
        </div>
    );
}
