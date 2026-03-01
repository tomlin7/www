import { OrbitControls, Stars } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useState, useMemo } from 'react'
import * as THREE from 'three'
import Vehicle from './Vehicle'
import ProjectLocation from './ProjectLocation'
import Road from './Road'
import Scenery from './Scenery'
import { projects } from './projects'

export default function Experience() {
    const [carPos, setCarPos] = useState(new THREE.Vector3())
    const memoizedPoints = useMemo(() => projects, [])

    return (
        <>
            <OrbitControls makeDefault target={[0, 2, 0]} />

            {/* Visual background */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Lights */}
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[20, 30, 10]}
                intensity={3}
                castShadow
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0005}
                shadow-normalBias={0.02}
            />

            {/* Environment Helpers */}
            <axesHelper args={[5]} />

            {/* Ground */}
            <RigidBody type="fixed" colliders={false}>
                <mesh receiveShadow position={[0, -0.5, 0]}>
                    <boxGeometry args={[400, 1, 400]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
                <CuboidCollider args={[200, 0.5, 200]} position={[0, -0.5, 0]} />
            </RigidBody>

            {/* Road Layout */}
            <Road />

            {/* Scenery (Trees, clouds) */}
            <Scenery />

            {/* Portfolio Projects */}
            {memoizedPoints.map((project) => (
                <ProjectLocation
                    key={project.id}
                    project={project}
                    carPosition={carPos}
                />
            ))}

            {/* The Vehicle */}
            <Vehicle onPositionUpdate={setCarPos} />
        </>
    )
}
