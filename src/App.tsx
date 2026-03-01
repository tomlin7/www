import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Sky, Environment, Stats } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Experience from './Experience'
import './App.css'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'brake', keys: ['Space'] },
  { name: 'reset', keys: ['KeyR'] },
]

function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas shadows camera={{ position: [0, 4, 10], fov: 60 }}>
        <color attach="background" args={['#bfd1e5']} />
        <Sky sunPosition={[100, 20, 100]} />

        <Physics gravity={[0, -9.81, 0]}>
          <Experience />
        </Physics>

        <Environment preset="city" />
        <Stats />
      </Canvas>
      <div id="info" className="ui">
        <p>WASD or Arrow keys to move</p>
        <p>Space to brake | R to reset</p>
      </div>
    </KeyboardControls>
  )
}

export default App
