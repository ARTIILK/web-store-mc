import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function Scene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-5 grayscale">
            <Canvas camera={{ position: [0, 0, 30], fov: 75 }} dpr={1}>
                <ambientLight intensity={0.1} />
                <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.1} />
            </Canvas>
        </div>
    );
}
