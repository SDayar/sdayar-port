import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Html, Cylinder, Box, Sphere, Torus } from '@react-three/drei'
import { useRef, useState } from 'react'

// Composant pour une carte de développement
function DevBoard() {
  const boardRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useFrame((state) => {
    if (boardRef.current) {
      // Rotation
      boardRef.current.rotation.y += 0.002
      boardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      boardRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  return (
    <group
      ref={boardRef}
      scale={clicked ? 1.2 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Carte principale (PCB)*/}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.5, 0.15, 3]} />
        <meshStandardMaterial 
          color={hovered ? '#1B4D1B' : '#0A2F0A'} 
          emissive={hovered ? '#0F3F0F' : '#051505'}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Bordure dorée de la carte */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[4.52, 0.05, 3.02]} />
        <meshStandardMaterial color="#B8860B" emissive="#5A3E0A" metalness={0.9} roughness={0.1} transparent opacity={0.3} />
      </mesh>

      {/* Pistes de cuivre */}
      {[...Array(12)].map((_, i) => {
        const x = -2 + i * 0.4
        return (
          <mesh key={`trace-h-${i}`} position={[x, 0.1, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.08, 0.02, 2.5]} />
            <meshStandardMaterial color="#CD7F32" emissive="#8B4513" metalness={1} roughness={0.2} />
          </mesh>
        )
      })}

      {[...Array(8)].map((_, i) => {
        const z = -1.2 + i * 0.4
        return (
          <mesh key={`trace-v-${i}`} position={[0, 0.1, z]} rotation={[0, 0, 0]}>
            <boxGeometry args={[3.5, 0.02, 0.08]} />
            <meshStandardMaterial color="#CD7F32" emissive="#8B4513" metalness={1} roughness={0.2} />
          </mesh>
        )
      })}

      {/* Microcontrôleur principal */}
      <group position={[1, 0.2, 0.5]}>
        {/* Boîtier */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.2, 1]} />
          <meshStandardMaterial color="#1E1E1E" emissive="#0A0A0A" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Marquage */}
        <Html position={[0, 0.15, 0]} center>
          <div style={{ 
            color: '#FFD700', 
            fontSize: '12px', 
            fontFamily: 'monospace',
            fontWeight: 'bold',
            textShadow: '0 0 5px #FFD700',
            transform: 'rotate(180deg)'
          }}>
            STM32F4
          </div>
        </Html>

        {/* Pins du microcontrôleur */}
        {[...Array(20)].map((_, i) => {
          const x = -0.6 + (i % 10) * 0.13
          const z = i < 10 ? -0.55 : 0.55
          return (
            <mesh key={`mcu-pin-${i}`} position={[x, -0.05, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
              <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </mesh>
          )
        })}
      </group>

      {/* Connecteur USB */}
      <group position={[-1.5, 0.15, -1]}>
        <mesh>
          <boxGeometry args={[0.8, 0.15, 0.4]} />
          <meshStandardMaterial color="#2A2A2A" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.1, 0.25]}>
          <boxGeometry args={[0.4, 0.05, 0.1]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
        </mesh>
        <Html position={[0, 0.2, 0]} center>
          <div style={{ color: '#FFF', fontSize: '8px', fontFamily: 'monospace' }}>USB</div>
        </Html>
      </group>

      {/* Connecteur d'alimentation */}
      <group position={[-1.5, 0.15, 1]}>
        <Cylinder args={[0.2, 0.2, 0.3, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
        </Cylinder>
        <Html position={[0, 0.25, 0]} center>
          <div style={{ color: '#FFF', fontSize: '8px', fontFamily: 'monospace' }}>5V</div>
        </Html>
      </group>

      {/* Quartz (oscillateur) */}
      <group position={[-0.5, 0.2, -1.2]}>
        <Cylinder args={[0.15, 0.15, 0.1, 16]}>
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Html position={[0, 0.1, 0]} center>
          <div style={{ color: '#FFF', fontSize: '6px', fontFamily: 'monospace' }}>8MHz</div>
        </Html>
      </group>

      {/* LEDs d'état */}
      <group position={[1.8, 0.25, -1.2]}>
        <Sphere args={[0.1, 16, 16]}>
          <meshStandardMaterial color="#FF4444" emissive={hovered ? "#FF8888" : "#440000"} />
        </Sphere>
        <Html position={[0, -0.15, 0]} center>
          <div style={{ color: '#FFF', fontSize: '6px' }}>PWR</div>
        </Html>
      </group>

      <group position={[1.8, 0.25, -0.8]}>
        <Sphere args={[0.1, 16, 16]}>
          <meshStandardMaterial color="#44FF44" emissive={hovered ? "#88FF88" : "#004400"} />
        </Sphere>
        <Html position={[0, -0.15, 0]} center>
          <div style={{ color: '#FFF', fontSize: '6px' }}>STAT</div>
        </Html>
      </group>

      {/* Condensateurs électrolytiques */}
      <group position={[2, 0.3, 0.8]}>
        <Cylinder args={[0.2, 0.2, 0.4, 16]}>
          <meshStandardMaterial color="#2A5C8A" />
        </Cylinder>
        <Cylinder args={[0.15, 0.15, 0.1, 16]} position={[0, 0.25, 0]}>
          <meshStandardMaterial color="#C0C0C0" metalness={1} />
        </Cylinder>
        <Html position={[0, 0, 0]} center>
          <div style={{ color: '#FFF', fontSize: '6px' }}>100µF</div>
        </Html>
      </group>

      {/* Résistances CMS */}
      {[...Array(6)].map((_, i) => {
        const x = -0.5 + i * 0.4
        return (
          <mesh key={`res-${i}`} position={[x, 0.12, 1.2]}>
            <boxGeometry args={[0.2, 0.05, 0.1]} />
            <meshStandardMaterial color="#8B4513" emissive="#3A1E0A" />
          </mesh>
        )
      })}

      {/* Header GPIO */}
      <group position={[-2, 0.25, 0]}>
        {[...Array(10)].map((_, i) => {
          const z = -1 + i * 0.2
          return (
            <mesh key={`gpio-${i}`} position={[0, 0, z]}>
              <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
              <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </mesh>
          )
        })}
        <Html position={[0, 0.15, -1]} center>
          <div style={{ color: '#FFF', fontSize: '8px' }}>GPIO</div>
        </Html>
      </group>

      {/* Bouton poussoir */}
      <group position={[-0.5, 0.2, 1.3]}>
        <Cylinder args={[0.15, 0.15, 0.1, 8]}>
          <meshStandardMaterial color="#FFD700" metalness={0.9} />
        </Cylinder>
        <Cylinder args={[0.1, 0.1, 0.15, 8]} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#FFFFFF" />
        </Cylinder>
        <Html position={[0, 0.2, 0]} center>
          <div style={{ color: '#FFF', fontSize: '6px' }}>RESET</div>
        </Html>
      </group>

      {/* Connecteur JTAG */}
      <group position={[2.2, 0.15, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.1, 0.8]} />
          <meshStandardMaterial color="#2A2A2A" />
        </mesh>
        <Html position={[0, 0.1, 0]} center>
          <div style={{ color: '#FFD700', fontSize: '8px' }}>JTAG</div>
        </Html>
      </group>

      {/* Points de test */}
      {[...Array(4)].map((_, i) => {
        const x = -1 + i * 0.6
        return (
          <mesh key={`test-${i}`} position={[x, 0.15, -0.5]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
            <meshStandardMaterial color="#FFD700" metalness={1} />
          </mesh>
        )
      })}

      {/* Effet de brillance sur les composants au survol */}
      {hovered && (
        <pointLight position={[0, 2, 2]} intensity={0.5} color="#6366F1" />
      )}
    </group>
  )
}

function Hero3D() {
  return (
    <div className="hero-3d">
      <Canvas 
        camera={{ 
          position: [6, 3, 8], 
          fov: 35,
          near: 0.1,
          far: 1000
        }}
        shadows
      >
        {/* Éclairage */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, 3]} intensity={0.8} color="#6366F1" />
        <pointLight position={[3, 1, 4]} intensity={0.6} color="#00FF88" />
        <pointLight position={[0, 4, 0]} intensity={0.4} color="#FFFFFF" />
        
        {/* Réflecteur */}
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} metalness={0.2} />
        </mesh>

        <DevBoard />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Overlay d'information */}
      <div className="hero-overlay">
        <div className="hero-chip-info">
          <span className="hero-led"></span>
          <span className="hero-text">STM32F4 - ARM Cortex-M4</span>
        </div>
      </div>
    </div>
  )
}

export default Hero3D