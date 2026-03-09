import { useGLTF, useTexture } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function Terrain() {
    const { scene } = useGLTF('/terrain/terrain-compressed.glb')
    const texture = useTexture('/terrain/terrain.png')

    useMemo(() => {
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace

        scene.traverse((node) => {
            if ((node as THREE.Mesh).isMesh) {
                const mesh = node as THREE.Mesh
                mesh.receiveShadow = true
                mesh.castShadow = true
                mesh.material = new THREE.MeshStandardMaterial({
                    map: texture,
                })
            }
        })
    }, [scene, texture])

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <primitive object={scene} />
        </RigidBody>
    )
}

useGLTF.preload('/terrain/terrain-compressed.glb')
useTexture.preload('/terrain/terrain.png')
