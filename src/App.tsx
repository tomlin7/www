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
        <h1>3D Interactive Portfolio</h1>
        <p>Drive to project locations to reveal work</p>
        <div className="controls-hint">
          <p><strong>WASD / Arrows</strong>: Drive</p>
          <p><strong>Space</strong>: Brake | <strong>R</strong>: Reset</p>
        </div>
      </div>
    </KeyboardControls>
  )
}

export default App
