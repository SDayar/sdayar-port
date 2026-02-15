import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import { useRef, useState } from 'react'

// Composant pour une carte électronique (PCB)
function PCBBoard() {
  const boardRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (boardRef.current) {
      // Rotation lente et fluide
      boardRef.current.rotation.y += 0.005
      boardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group
      ref={boardRef}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Carte principale (PCB) */}
      <mesh position={[0, 0, 0]} scale={clicked ? 1.1 : 1}>
        <boxGeometry args={[2.5, 0.2, 1.8]} />
        <meshStandardMaterial 
          color={hovered ? '#4CAF50' : '#2E7D32'} 
          emissive={hovered ? '#1B5E20' : '#0A2F0A'}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Pistes de cuivre (lignes dorées) */}
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={`trace-${i}`}
          position={[-1 + i * 0.8, 0.15, -0.5]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[0.1, 0.05, 1.2]} />
          <meshStandardMaterial color="#FFD700" emissive="#B8860B" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Composants SMD (petits boîtiers) */}
      {[...Array(8)].map((_, i) => {
        const x = -0.8 + (i % 4) * 0.5
        const z = -0.4 + Math.floor(i / 4) * 0.8
        return (
          <mesh key={`smd-${i}`} position={[x, 0.15, z]}>
            <boxGeometry args={[0.15, 0.1, 0.15]} />
            <meshStandardMaterial 
              color="#C0C0C0" 
              emissive="#333333"
              metalness={0.6} 
              roughness={0.3} 
            />
          </mesh>
        )
      })}

      {/* Condensateurs (cylindres) */}
      {[...Array(4)].map((_, i) => {
        const x = -0.6 + i * 0.8
        return (
          <mesh key={`cap-${i}`} position={[x, 0.25, 0.6]}>
            <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
            <meshStandardMaterial color="#424242" emissive="#212121" roughness={0.3} metalness={0.2} />
          </mesh>
        )
      })}

      {/* Microcontrôleur (grand boîtier central) */}
      <mesh position={[0, 0.15, 0.2]}>
        <boxGeometry args={[0.8, 0.15, 0.6]} />
        <meshStandardMaterial 
          color="#1E1E1E" 
          emissive="#0A0A0A"
          metalness={0.7} 
          roughness={0.2} 
        />
      </mesh>

      {/* Pins du microcontrôleur */}
      {[...Array(8)].map((_, i) => {
        const x = -0.35 + i * 0.1
        return (
          <mesh key={`pin-${i}`} position={[x, 0.25, -0.1]}>
            <boxGeometry args={[0.05, 0.1, 0.05]} />
            <meshStandardMaterial color="#B8860B" emissive="#8B6914" metalness={1} roughness={0.1} />
          </mesh>
        )
      })}

      {/* LED (indicateur lumineux) */}
      <mesh position={[1, 0.15, -0.5]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#FF4444" 
          emissive={hovered ? "#FF8888" : "#FF0000"}
          roughness={0.2}
        />
      </mesh>

      {/* Connecteurs (prises) */}
      <mesh position={[-1, 0.15, 0.8]}>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Texte "ARM" sur le microcontrôleur (optionnel) */}
      <Html position={[0, 0.3, 0.2]} center>
        <div style={{ 
          color: '#FFD700', 
          fontSize: '8px', 
          fontFamily: 'monospace',
          fontWeight: 'bold',
          textShadow: '0 0 5px #FFD700'
        }}>
          ARM
        </div>
      </Html>
    </group>
  )
}

// Composant pour un oscilloscope (alternatif)
function Oscilloscope() {
  const scopeRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (scopeRef.current) {
      scopeRef.current.rotation.y += 0.003
    }
  })

  return (
    <group ref={scopeRef}>
      {/* Écran */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 1, 0.2]} />
        <meshStandardMaterial color="#2A2A2A" emissive="#0F0F0F" />
      </mesh>
      
      {/* Écran vert (cathodique) */}
      <mesh position={[0, 0.5, 0.11]}>
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial color="#00FF88" emissive="#004D26" />
      </mesh>

      {/* Forme d'onde */}
      <Html position={[0, 0.5, 0.15]} center>
        <div style={{ color: '#00FF88', fontSize: '20px', fontFamily: 'monospace' }}>
          ⎽⎽⎼⎼⎽⎽⎼⎼
        </div>
      </Html>

      {/* Boutons */}
      {[...Array(4)].map((_, i) => (
        <mesh key={`btn-${i}`} position={[-0.5 + i * 0.3, -0.1, 0.1]}>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function Hero3D() {
  const [objectType, setObjectType] = useState('pcb') // 'pcb' ou 'oscilloscope'

  return (
    <div className="hero-3d">
      <Canvas camera={{ position: [4, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-2, 3, 2]} intensity={0.5} color="#6366F1" />
        <pointLight position={[2, 1, 3]} intensity={0.3} color="#00FF88" />
        
        {objectType === 'pcb' ? <PCBBoard /> : <Oscilloscope />}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Bouton pour changer l'objet (optionnel) */}
      <button 
        className="hero-switch"
        onClick={() => setObjectType(prev => prev === 'pcb' ? 'oscilloscope' : 'pcb')}
      >
        {objectType === 'pcb' ? '🎛️ Voir oscilloscope' : '🔌 Voir PCB'}
      </button>
    </div>
  )
}

export default Hero3D