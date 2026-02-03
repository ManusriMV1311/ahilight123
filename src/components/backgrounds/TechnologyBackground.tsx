"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function CircuitBoard() {
    const meshRef = useRef<THREE.Mesh>(null);

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color('#00d4aa') },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          vec2 grid = floor(vUv * 20.0);
          float r = random(grid);
          
          // Circuit lines
          float lines = step(0.95, fract(vUv.x * 20.0)) + step(0.95, fract(vUv.y * 20.0));
          
          // Pulsing data
          float pulse = sin(time * 2.0 + r * 10.0) * 0.5 + 0.5;
          
          vec3 finalColor = color * (lines * 0.5 + pulse * r * 0.5);
          gl_FragColor = vec4(finalColor, 0.8);
        }
      `,
            transparent: true,
        });
    }, []);

    useFrame((state) => {
        shaderMaterial.uniforms.time.value = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.position.z = (state.clock.elapsedTime * 0.5) % 20 - 10;
        }
    });

    return (
        <mesh ref={meshRef} material={shaderMaterial} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50, 1, 1]} />
        </mesh>
    );
}

export function TechnologyBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas camera={{ position: [0, 5, 5] }}>
                <color attach="background" args={['#000000']} />
                <CircuitBoard />
            </Canvas>
        </div>
    );
}
