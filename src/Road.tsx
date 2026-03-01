export default function Road() {
    return (
        <group>
            {/* Central Strip */}
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, -30]} receiveShadow>
                <planeGeometry args={[10, 100]} />
                <meshStandardMaterial
                    color="#111"
                    roughness={1}
                    polygonOffset
                    polygonOffsetFactor={1}
                />
            </mesh>

            <mesh rotation-x={-Math.PI / 2} position={[10, 0.06, -15]} receiveShadow>
                <planeGeometry args={[20, 10]} />
                <meshStandardMaterial
                    color="#111"
                    roughness={1}
                    polygonOffset
                    polygonOffsetFactor={1}
                />
            </mesh>

            <mesh rotation-x={-Math.PI / 2} position={[-10, 0.06, -30]} receiveShadow>
                <planeGeometry args={[20, 10]} />
                <meshStandardMaterial
                    color="#111"
                    roughness={1}
                    polygonOffset
                    polygonOffsetFactor={1}
                />
            </mesh>

            <mesh rotation-x={-Math.PI / 2} position={[0, 0.06, -50]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial
                    color="#111"
                    roughness={1}
                    polygonOffset
                    polygonOffsetFactor={1}
                />
            </mesh>
        </group>
    )
}
