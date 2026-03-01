import { OrbitControls } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import Vehicle from './Vehicle'

export default function Experience() {
    return (
        <>
            <OrbitControls makeDefault target={[0, 2, 0]} />

            {/* Lights Matching original script logic */}
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[0, 12.5, 12.5]}
                intensity={4}
                castShadow
                shadow-camera-left={-40}
                shadow-camera-right={40}
                shadow-camera-top={40}
                shadow-camera-bottom={-40}
                shadow-camera-near={1}
                shadow-camera-far={50}
                shadow-mapSize={[2048, 2048]}
            />

            {/* Ground (Matches the 100x100 white box at [0, -0.25, -20]) */}
            <RigidBody type="fixed" colliders={false}>
                <mesh receiveShadow position={[0, -0.25, -20]}>
                    <boxGeometry args={[100, 0.5, 100]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
                <CuboidCollider args={[50, 0.25, 50]} position={[0, -0.25, -20]} />
            </RigidBody>

            {/* Grid helper for visual ground reference */}
            <gridHelper args={[100, 80, 0x000000, 0x888888]} position={[0, 0.01, -20]} />

            <Vehicle />
        </>
    )
}
