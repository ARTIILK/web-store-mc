import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface ArmorPreviewProps {
  color?: string;
  enchanted?: boolean;
}

export default function ArmorPreview({ color = '#ffffff', enchanted = false }: ArmorPreviewProps) {
  const group = useRef<THREE.Group>(null);
  
  // In a real app, you would load an actual Minecraft armor GLTF model here.
  // For this demo, we'll create a stylized representation using basic geometries
  // to avoid needing external assets.
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      
      if (enchanted) {
        // Add a subtle wobble for enchanted items
        group.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      }
    }
  });

  const materialProps = {
    color: new THREE.Color(color),
    roughness: 0.2,
    metalness: 0.8,
    envMapIntensity: 2,
  };

  const enchantedMaterialProps = enchanted ? {
    emissive: new THREE.Color('#a855f7'),
    emissiveIntensity: 0.5,
  } : {};

  return (
    <group ref={group} dispose={null} position={[0, -1, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Helmet */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>

        {/* Chestplate */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[1, 1.2, 0.5]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.7, 0.8, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>
        <mesh position={[0.7, 0.8, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>

        {/* Leggings */}
        <mesh position={[-0.25, -0.4, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>
        <mesh position={[0.25, -0.4, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>

        {/* Boots */}
        <mesh position={[-0.25, -1.1, 0]} castShadow>
          <boxGeometry args={[0.45, 0.3, 0.45]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>
        <mesh position={[0.25, -1.1, 0]} castShadow>
          <boxGeometry args={[0.45, 0.3, 0.45]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>
      </Float>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2} far={4} />
      <Environment preset="city" />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} color={enchanted ? '#a855f7' : '#ffffff'} intensity={enchanted ? 2 : 0.5} />
    </group>
  );
}
