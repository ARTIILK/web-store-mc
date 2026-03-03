import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface CoinStackProps {
    count: number;
}

function Stack({ count }: CoinStackProps) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Number of coins to show in the 3D stack (cap it for performance and visual clarity)
    // 1 visually represented coin = 100 actual coins in the purchase? Or just logarithmic
    const visualCount = Math.min(Math.floor(count / 100), 50);

    useFrame((state) => {
        if (!mesh.current) return;
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < visualCount; i++) {
            const x = Math.sin(i * 0.5) * 0.2;
            const z = Math.cos(i * 0.5) * 0.2;
            const y = i * 0.15;

            dummy.position.set(x, y - (visualCount * 0.075), z);
            dummy.rotation.set(0, time * 0.5 + (i * 0.1), 0);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, 50]}>
            <cylinderGeometry args={[1, 1, 0.1, 32]} />
            <meshStandardMaterial
                color="#fbbf24"
                metalness={0.8}
                roughness={0.2}
                emissive="#f59e0b"
                emissiveIntensity={0.2}
            />
        </instancedMesh>
    );
}

export default function CoinStack3D({ count }: CoinStackProps) {
    return (
        <div className="w-full h-80 cursor-grab active:cursor-grabbing">
            <Canvas shadows gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#fbbf24" />
                <spotLight position={[-10, 10, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Stack count={count} />
                </Float>

                <OrbitControls
                    enableZoom={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
