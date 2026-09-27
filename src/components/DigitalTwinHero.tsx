import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

const RocketPart = ({ position, rotation, scale, color, factor = 1, scrollProgress }: {
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
    color: string,
    factor?: number,
    scrollProgress: MotionValue<number>
}) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!meshRef.current) return;

        const progress = scrollProgress.get();

        // Disassemble logic: move outward based on scrollProgress
        const offset = progress * 10 * factor;
        meshRef.current.position.y = position[1] + (progress * 5 * factor);
        meshRef.current.position.x = position[0] + (progress > 0.05 ? Math.sin(factor * 10) * offset : 0);
        meshRef.current.position.z = position[2] + (progress > 0.1 ? Math.cos(factor * 10) * offset : 0);

        // Rotate as it flies away
        meshRef.current.rotation.x += 0.01 * progress;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
            <coneGeometry args={[1, 2, 8]} />
            <MeshDistortMaterial
                color={color}
                speed={2}
                distort={0.4}
                radius={1}
                wireframe={false} // Simplification for now to avoid complexity issues
            />
        </mesh>
    );
};

const CoreEngine = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            const progress = scrollProgress.get();
            groupRef.current.rotation.y += 0.01;
            groupRef.current.scale.setScalar(1 + progress * 2);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Core Node */}
            <Sphere args={[0.5, 32, 32]}>
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
            </Sphere>

            {/* Orbits */}
            {[1, 2, 3].map((i) => (
                <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                    <torusGeometry args={[i * 0.8, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#3b82f6" opacity={0.5} transparent />
                </mesh>
            ))}
        </group>
    );
};

const Scene = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group rotation={[0.2, 0, 0]}>
                    {/* Main Body (Upper) */}
                    <RocketPart
                        position={[0, 1, 0]}
                        rotation={[0, 0, 0]}
                        scale={[1, 1.5, 1]}
                        color="#3b82f6"
                        factor={1}
                        scrollProgress={scrollProgress}
                    />

                    {/* Side Thruster L */}
                    <RocketPart
                        position={[-1.2, -0.5, 0]}
                        rotation={[0, 0, 0.2]}
                        scale={[0.5, 1, 0.5]}
                        color="#1d4ed8"
                        factor={2.5}
                        scrollProgress={scrollProgress}
                    />

                    {/* Side Thruster R */}
                    <RocketPart
                        position={[1.2, -0.5, 0]}
                        rotation={[0, 0, -0.2]}
                        scale={[0.5, 1, 0.5]}
                        color="#1d4ed8"
                        factor={2}
                        scrollProgress={scrollProgress}
                    />

                    {/* Revealable Core */}
                    <CoreEngine scrollProgress={scrollProgress} />
                </group>
            </Float>

            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        </>
    );
};

const DigitalTwinHero = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas>
                <Scene scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    );
};

export default DigitalTwinHero;
