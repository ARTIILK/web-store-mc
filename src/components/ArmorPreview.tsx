import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

interface ArmorPreviewProps {
  color?: string;
  enchanted?: boolean;
  textureUrl?: string;
  armorType?: 'iron' | 'diamond' | 'netherite';
}

// Texture configuration
const ARMOR_TEXTURES = {
  iron: '#a8a8a8',
  diamond: '#33ebcb',
  netherite: '#443a3b',
};

export default function ArmorPreview({ 
  color = '#8b7355', 
  enchanted = false,
  textureUrl,
  armorType = 'iron'
}: ArmorPreviewProps) {
  const group = useRef<THREE.Group>(null);
  
  // Use provided color or texture, otherwise use armor type defaults
  const baseColor = textureUrl ? '#ffffff' : (color || ARMOR_TEXTURES[armorType]);
  const colorObj = useMemo(() => new THREE.Color(baseColor), [baseColor]);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      if (enchanted) {
        group.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.15;
      }
    }
  });

  const materialProps = {
    color: colorObj,
    roughness: enchanted ? 0.3 : 0.4,
    metalness: enchanted ? 0.9 : 0.7,
    envMapIntensity: 1.5,
  };

  const enchantedMaterialProps = enchanted ? {
    emissive: new THREE.Color('#a855f7'),
    emissiveIntensity: 0.8,
  } : {};

  return (
    <group ref={group} dispose={null} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={enchanted ? 0.15 : 0.1}>
        {/* Helmet */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>

        {/* Chestplate */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 1.3, 0.6]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>

        {/* Left Arm */}
        <mesh position={[-0.8, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.3, 0.5]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>
        
        {/* Right Arm */}
        <mesh position={[0.8, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.3, 0.5]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>

        {/* Left Leg */}
        <mesh position={[-0.3, -1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 1.3, 0.45]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>
        
        {/* Right Leg */}
        <mesh position={[0.3, -1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 1.3, 0.45]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>

        {/* Left Boot */}
        <mesh position={[-0.3, -1.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.35, 0.5]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>
        
        {/* Right Boot */}
        <mesh position={[0.3, -1.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.35, 0.5]} />
          <meshStandardMaterial {...materialProps} {...enchantedMaterialProps} />
        </mesh>
      </Float>

      {/* Enchantment particles effect */}
      {enchanted && (
        <>
          <mesh position={[0, 0, 1.5]} scale={0.1}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={1}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh position={[1.2, 1, -1.2]} scale={0.08}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color="#d946ef"
              emissive="#d946ef"
              emissiveIntensity={1}
              transparent
              opacity={0.5}
            />
          </mesh>
        </>
      )}

      <ContactShadows position={[0, -2.0, 0]} opacity={0.5} scale={6} blur={2.5} far={5} />
      <Environment>
        <Lightformer
          intensity={2}
          position={[0, 5, 0]}
          scale={[10, 1, 1]}
          form="circle"
        />
        <Lightformer
          intensity={1.5}
          position={[-5, 0, 0]}
          scale={[1, 10, 1]}
          form="circle"
        />
      </Environment>
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
      />
      <pointLight 
        position={[-6, 4, -4]} 
        color={enchanted ? '#a855f7' : '#fbbf24'} 
        intensity={enchanted ? 2.5 : 1.2}
      />
      <pointLight 
        position={[6, 2, 4]} 
        color={enchanted ? '#d946ef' : '#f97316'} 
        intensity={enchanted ? 2 : 0.8}
      />
    </group>
  );
}
