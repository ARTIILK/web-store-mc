import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function AmbientParticles() {
    const count = 3; // Further reduced for performance
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 10 + Math.random() * 50;
            const speed = 0.002 + Math.random() / 1000;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t = t + speed;
            const s = Math.cos(t);
            dummy.position.set(
                (xFactor + Math.cos(t / 10) * factor),
                (yFactor + Math.sin(t / 10) * factor),
                (zFactor + Math.cos(t / 10) * factor)
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 2, s * 2, s * 2);
            dummy.updateMatrix();
            mesh.current?.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} transparent opacity={0.3} />
        </instancedMesh>
    );
}

export default function Scene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-1000">
            <Canvas camera={{ position: [0, 0, 30], fov: 75 }} dpr={[1, 2]}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} color="#fbbf24" intensity={0.5} />

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
                <Sparkles count={50} scale={30} size={1} speed={0.2} color="#fbbf24" opacity={0.2} />

                <AmbientParticles />

                <fog attach="fog" args={['#070707', 20, 45]} />
            </Canvas>
        </div>
    );
}
