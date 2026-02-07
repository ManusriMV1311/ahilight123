"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface Particle {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    color: THREE.Color;
    size: number;
}

function FusionAnimation() {
    const blob1Ref = useRef<THREE.Mesh>(null);
    const blob2Ref = useRef<THREE.Mesh>(null);
    const blob3Ref = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    const particleCount = 200;
    const animationDuration = 12; // Full cycle duration in seconds

    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: particleCount }, () => ({
            position: new THREE.Vector3(0, 0, 0),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.2
            ),
            color: new THREE.Color().lerpColors(
                new THREE.Color("#7D5FFF"),
                new THREE.Color("#00F2FF"),
                Math.random()
            ),
            size: Math.random() * 0.15 + 0.05,
        }));
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const cycle = time % animationDuration;
        const phase = cycle / animationDuration;

        // Phase 1 (0-0.25): Blobs converge to center
        if (phase < 0.25) {
            const convergeFactor = phase / 0.25;
            const easeConverge = 1 - Math.pow(1 - convergeFactor, 3);

            if (blob1Ref.current) {
                blob1Ref.current.position.x = THREE.MathUtils.lerp(-4, 0, easeConverge);
                blob1Ref.current.position.y = THREE.MathUtils.lerp(3, 0, easeConverge);
                blob1Ref.current.scale.setScalar(THREE.MathUtils.lerp(2.5, 2, easeConverge));
            }
            if (blob2Ref.current) {
                blob2Ref.current.position.x = THREE.MathUtils.lerp(4, 0, easeConverge);
                blob2Ref.current.position.y = THREE.MathUtils.lerp(-2, 0, easeConverge);
                blob2Ref.current.scale.setScalar(THREE.MathUtils.lerp(2, 1.5, easeConverge));
            }
            if (blob3Ref.current) {
                blob3Ref.current.position.x = THREE.MathUtils.lerp(0, 0, easeConverge);
                blob3Ref.current.position.y = THREE.MathUtils.lerp(-3, 0, easeConverge);
                blob3Ref.current.scale.setScalar(THREE.MathUtils.lerp(1.8, 1.5, easeConverge));
            }

            // Hide particles during convergence
            if (particlesRef.current) {
                particlesRef.current.visible = false;
            }
        }
        // Phase 2 (0.25-0.35): Brief fusion moment
        else if (phase < 0.35) {
            const fusionIntensity = Math.sin((phase - 0.25) * 31.4) * 0.3;

            if (blob1Ref.current) {
                blob1Ref.current.position.set(0, 0, -5);
                blob1Ref.current.scale.setScalar(2 + fusionIntensity);
            }
            if (blob2Ref.current) {
                blob2Ref.current.position.set(0, 0, -5);
                blob2Ref.current.scale.setScalar(1.5 + fusionIntensity);
            }
            if (blob3Ref.current) {
                blob3Ref.current.position.set(0, 0, -5);
                blob3Ref.current.scale.setScalar(1.5 + fusionIntensity);
            }

            if (particlesRef.current) {
                particlesRef.current.visible = false;
            }
        }
        // Phase 3 (0.35-0.4): Explosion - hide blobs, show particles
        else if (phase < 0.4) {
            if (blob1Ref.current) blob1Ref.current.visible = false;
            if (blob2Ref.current) blob2Ref.current.visible = false;
            if (blob3Ref.current) blob3Ref.current.visible = false;

            if (particlesRef.current) {
                particlesRef.current.visible = true;
                const explosionProgress = (phase - 0.35) / 0.05;
                const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
                const sizes = particlesRef.current.geometry.attributes.size?.array as Float32Array;

                particles.forEach((particle, i) => {
                    const i3 = i * 3;
                    const explosionForce = explosionProgress * 20;

                    positions[i3] = particle.velocity.x * explosionForce;
                    positions[i3 + 1] = particle.velocity.y * explosionForce;
                    positions[i3 + 2] = particle.velocity.z * explosionForce - 5;

                    if (sizes) {
                        sizes[i] = particle.size * (1 + explosionProgress * 2);
                    }
                });

                particlesRef.current.geometry.attributes.position.needsUpdate = true;
                if (sizes) particlesRef.current.geometry.attributes.size.needsUpdate = true;
            }
        }
        // Phase 4 (0.4-1): Particles spread and float
        else {
            if (blob1Ref.current) blob1Ref.current.visible = false;
            if (blob2Ref.current) blob2Ref.current.visible = false;
            if (blob3Ref.current) blob3Ref.current.visible = false;

            if (particlesRef.current) {
                particlesRef.current.visible = true;
                const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
                const spreadTime = (phase - 0.4) / 0.6;

                particles.forEach((particle, i) => {
                    const i3 = i * 3;

                    // Continue spreading outward
                    particle.position.x += particle.velocity.x * 0.1;
                    particle.position.y += particle.velocity.y * 0.1;
                    particle.position.z += particle.velocity.z * 0.05;

                    // Add gentle floating
                    particle.position.y += Math.sin(time * 2 + i * 0.1) * 0.01;

                    positions[i3] = particle.position.x;
                    positions[i3 + 1] = particle.position.y;
                    positions[i3 + 2] = particle.position.z - 5;
                });

                particlesRef.current.geometry.attributes.position.needsUpdate = true;
            }
        }

        // Show blobs again for next cycle
        if (phase >= 0.95) {
            if (blob1Ref.current) blob1Ref.current.visible = true;
            if (blob2Ref.current) blob2Ref.current.visible = true;
            if (blob3Ref.current) blob3Ref.current.visible = true;

            // Reset particles
            particles.forEach(particle => {
                particle.position.set(0, 0, 0);
            });
        }
    });

    // Prepare particle geometry
    const particlePositions = useMemo(() =>
        new Float32Array(particleCount * 3).fill(0),
        []);

    const particleColors = useMemo(() =>
        new Float32Array(particles.flatMap(p => [p.color.r, p.color.g, p.color.b])),
        [particles]);

    const particleSizes = useMemo(() =>
        new Float32Array(particles.map(p => p.size)),
        [particles]);

    return (
        <>
            {/* Blob 1 - Purple */}
            <mesh ref={blob1Ref} position={[-4, 3, -5]} scale={2.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#7D5FFF"
                    attach="material"
                    distort={0.6}
                    speed={1.5}
                    roughness={0.4}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Blob 2 - Cyan */}
            <mesh ref={blob2Ref} position={[4, -2, -5]} scale={2}>
                <sphereGeometry args={[64, 64]} />
                <MeshDistortMaterial
                    color="#00F2FF"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.3}
                    transparent
                    opacity={0.45}
                />
            </mesh>

            {/* Blob 3 - Mixed */}
            <mesh ref={blob3Ref} position={[0, -3, -5]} scale={1.8}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#A07FFF"
                    attach="material"
                    distort={0.7}
                    speed={1.8}
                    roughness={0.35}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Explosion Particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={particlePositions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particleCount}
                        array={particleColors}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-size"
                        count={particleCount}
                        array={particleSizes}
                        itemSize={1}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.1}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>
        </>
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
                camera={{ position: [0, 0, 8], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F2FF" />
                <FusionAnimation />
            </Canvas>
        </div>
    );
}
