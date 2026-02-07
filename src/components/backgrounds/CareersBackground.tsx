"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { SharedUniverse } from "./common/SharedUniverse";

function FloatingCubes({ count = 100 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    // Generate random data for cubes
    const { positions, rotations, scales, speeds, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const rotations = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const speeds = new Float32Array(count);
        const colorArray = new Float32Array(count * 3);

        const palette = [
            new THREE.Color('#06b6d4'), // Cyan
            new THREE.Color('#3b82f6'), // Blue
            new THREE.Color('#a855f7'), // Purple
            new THREE.Color('#ffffff')  // White
        ];

        for (let i = 0; i < count; i++) {
            // Spread widely
            positions[i * 3] = (Math.random() - 0.5) * 20;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z

            rotations[i * 3] = Math.random() * Math.PI;
            rotations[i * 3 + 1] = Math.random() * Math.PI;
            rotations[i * 3 + 2] = Math.random() * Math.PI;

            scales[i] = 0.2 + Math.random() * 0.5;
            speeds[i] = 0.2 + Math.random() * 0.5;

            const color = palette[Math.floor(Math.random() * palette.length)];
            color.toArray(colorArray, i * 3);
        }

        return { positions, rotations, scales, speeds, colors: colorArray };
    }, [count]);

    // Apply initial colors
    useLayoutEffect(() => {
        if (!meshRef.current) return;
        for (let i = 0; i < count; i++) {
            const color = new THREE.Color().fromArray(colors, i * 3);
            meshRef.current.setColorAt(i, color);
        }
        meshRef.current.instanceColor!.needsUpdate = true;
    }, [count, colors]);

    const tempObject = new THREE.Object3D();

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        // Move light
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(time * 0.5) * 5;
            lightRef.current.position.y = Math.cos(time * 0.3) * 5;
        }

        for (let i = 0; i < count; i++) {
            // Get current values
            let y = positions[i * 3 + 1];

            // Rise up logic
            y += speeds[i] * 0.01;
            // Reset if too high
            if (y > 10) y = -10;
            positions[i * 3 + 1] = y;

            const x = positions[i * 3];
            const z = positions[i * 3 + 2];

            const rotX = rotations[i * 3] + time * speeds[i] * 0.5;
            const rotY = rotations[i * 3 + 1] + time * speeds[i] * 0.3;

            // Apply transform
            tempObject.position.set(x, y, z);
            tempObject.rotation.set(rotX, rotY, 0);
            tempObject.scale.setScalar(scales[i]);

            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            <pointLight ref={lightRef} intensity={2} distance={20} color="#06b6d4" />
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.8}
                />
            </instancedMesh>
        </group>
    );
}

export function CareersBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-deep-navy">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.2} />
                <SharedUniverse />
                <FloatingCubes />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-tr from-deep-navy via-transparent to-deep-navy opacity-90" />
        </div>
    );
}
