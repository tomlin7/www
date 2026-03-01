import { Float } from '@react-three/drei'

function Tree({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Trunk */}
            <mesh castShadow receiveShadow position={[0, 0.75, 0]}>
                <cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
                <meshStandardMaterial color="#4d2f1d" />
            </mesh>

            {/* Leaves */}
            <mesh castShadow position={[0, 2.5, 0]}>
                <coneGeometry args={[1.2, 2.5, 8]} />
                <meshStandardMaterial color="#2d5a27" />
            </mesh>
            <mesh castShadow position={[0, 3.5, 0]}>
                <coneGeometry args={[0.8, 1.8, 8]} />
                <meshStandardMaterial color="#3e7a3a" />
            </mesh>
        </group>
    )
}

export default function Scenery() {
    const treePositions: [number, number, number][] = [
        [10, 0, -5],
        [-8, 0, -12],
        [15, 0, -35],
        [-18, 0, -45],
        [5, 0, -55],
        [-5, 0, -8],
        [22, 0, -20],
    ]

    return (
        <group>
            {treePositions.map((pos, i) => (
                <Tree key={i} position={pos} />
            ))}

            {/* A few clouds */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
                <mesh position={[10, 15, -20]}>
                    <boxGeometry args={[4, 2, 6]} />
                    <meshStandardMaterial color="white" transparent opacity={0.6} />
                </mesh>
            </Float>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
                <mesh position={[-15, 12, -40]}>
                    <boxGeometry args={[6, 3, 8]} />
                    <meshStandardMaterial color="white" transparent opacity={0.6} />
                </mesh>
            </Float>
        </group>
    )
}
