import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Float,
  Stars,
  Sparkles,
} from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'

function FloatingEmail({ position, delay }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(1.2, 0.8, 0.05), [])
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ffffff' }), [])

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.6}
      floatRange={[-0.2, 0.2]}
      rotation={[0, 0, Math.PI / 8]}
    >
      <mesh
        position={position}
        geometry={geometry}
        material={material}
        onPointerOver={(e) => {
          e.stopPropagation()
          e.object.material.color.set('#3b82f6')
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          e.object.material.color.set('#ffffff')
        }}
      />
    </Float>
  )
}

export default function EmailBackground() {
  return (
    <Canvas
      className="absolute inset-0 z-0 bg-black"
      camera={{ position: [0, 0, 7], fov: 50 }}
    >
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 2, 5]} intensity={1.5} color="#3b82f6" />
      <spotLight
        position={[0, 5, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.2}
        color="#38bdf8"
      />

      {/* Stars & Sparkles */}
      <Stars radius={50} depth={40} count={5000} factor={4} fade speed={1} />
      <Sparkles
        count={150}
        scale={10}
        size={2}
        speed={0.4}
        color="#ffffff"
        opacity={0.5}
      />


      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </Canvas>
  )
}