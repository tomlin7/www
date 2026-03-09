import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import Vehicle from './Vehicle'
import Terrain from './Terrain'

export default function Experience() {
    return (
        <Suspense fallback={null}>
            <OrbitControls makeDefault target={[0, 2, 0]} />

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

            {/* Terrain */}
            <Terrain />

            {/* The Vehicle */}
            <Vehicle />
        </Suspense>
    )
}
