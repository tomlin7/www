import { Html, Float, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import type { Project } from './projects'

interface ProjectLocationProps {
    project: Project;
    carPosition: THREE.Vector3;
}

export default function ProjectLocation({ project, carPosition }: ProjectLocationProps) {
    const [active, setActive] = useState(false)
    const markerRef = useRef<THREE.Group>(null!)

    useFrame(() => {
        if (!markerRef.current) return
        const projectPos = new THREE.Vector3(...project.position)
        const distance = carPosition.distanceTo(projectPos)

        if (distance < 6 && !active) setActive(true)
        if (distance >= 6 && active) setActive(false)
    })

    return (
        <group position={project.position} ref={markerRef}>
            {/* 3D Base Pedestal */}
            <mesh receiveShadow castShadow position={[0, 0.1, 0]}>
                <cylinderGeometry args={[2, 2.5, 0.25, 32]} />
                <meshStandardMaterial
                    color="#222"
                    emissive={active ? project.color : '#000'}
                    emissiveIntensity={active ? 1 : 0}
                />
            </mesh>

            {/* Discovery Ring (Lifting to Layer 0.3) */}
            {active && (
                <mesh
                    rotation-x={-Math.PI / 2}
                    position={[0, 0.3, 0]}
                    renderOrder={100}
                >
                    <torusGeometry args={[1.9, 0.03, 8, 48]} />
                    <meshBasicMaterial
                        color={project.color}
                        transparent
                        opacity={0.9}
                        depthTest={true}
                        polygonOffset
                        polygonOffsetFactor={-10}
                    />
                </mesh>
            )}

            {/* Floating Work Object */}
            <Float speed={2} rotationIntensity={active ? 2 : 0.5} floatIntensity={1}>
                <mesh position={[0, 2.5, 0]}>
                    <octahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial
                        color={project.color}
                        wireframe={!active}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            </Float>

            {/* Floating Popup */}
            {active && (
                <Html distanceFactor={15} position={[0, 4.5, 0]} center>
                    <div style={{
                        background: 'rgba(15, 15, 15, 0.95)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '16px',
                        border: `1px solid ${project.color}66`,
                        width: '260px',
                        fontFamily: 'Outfit, Inter, sans-serif',
                        boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${project.color}33`,
                        backdropFilter: 'blur(20px)',
                        pointerEvents: 'none',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 700 }}>{project.title}</h3>
                        <p style={{ margin: '0', fontSize: '15px', opacity: 0.8, lineHeight: '1.5' }}>
                            {project.description}
                        </p>
                    </div>
                </Html>
            )}

            {/* Text on the ground - lifted and offset */}
            <Text
                position={[0, 0.3, 3.5]}
                rotation-x={-Math.PI / 2}
                fontSize={0.5}
                color="#fff"
                maxWidth={4}
                textAlign="center"
                renderOrder={101}
                polygonOffset
                polygonOffsetFactor={-10}
            >
                {project.title}
            </Text>
        </group>
    )
}
