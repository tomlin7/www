import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, useRapier, CuboidCollider, RapierRigidBody } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'

const WHEEL_RADIUS = 0.7
const WHEEL_WIDTH = 0.8
const SUSPENSION_REST_LENGTH = 0.5
const SUSPENSION_STIFFNESS = 30.0
const FRICTION = 2000.0

const ACCEL_STEP = 1
const ACCEL_MIN = -30
const ACCEL_MAX = 30
const BRAKE_STEP = 0.05
const BRAKE_MAX = 1

const wheelPositions = [
    new THREE.Vector3(-1.4, 0, -1.8), // front-left
    new THREE.Vector3(1.4, 0, -1.8),  // front-right
    new THREE.Vector3(-1.4, 0, 1.8),  // rear-left
    new THREE.Vector3(1.4, 0, 1.8),   // rear-right
]

interface VehicleProps {
    onPositionUpdate?: (pos: THREE.Vector3) => void;
}

export default function Vehicle({ onPositionUpdate }: VehicleProps) {
    const [, getKeys] = useKeyboardControls()
    const { world } = useRapier()
    const { controls }: any = useThree()
    const chassisRef = useRef<RapierRigidBody>(null!)
    const [vehicleController, setVehicleController] = useState<any>(null)

    const forces = useRef({ accel: 0, brake: 0 })
    const wheelRefs = useRef<THREE.Group[]>([])

    useEffect(() => {
        if (!chassisRef.current) return
        const chassis = world.getRigidBody(chassisRef.current.handle)
        if (!chassis) return

        const controller = world.createVehicleController(chassis)
        const wheelDirection = { x: 0, y: -1, z: 0 }
        const wheelAxle = { x: -1, y: 0, z: 0 }

        wheelPositions.forEach((pos, index) => {
            controller.addWheel(pos, wheelDirection, wheelAxle, SUSPENSION_REST_LENGTH, WHEEL_RADIUS)
            controller.setWheelSuspensionStiffness(index, SUSPENSION_STIFFNESS)
            controller.setWheelFrictionSlip(index, FRICTION)
        })

        setVehicleController(controller)
        return () => world.removeVehicleController(controller)
    }, [world])

    useFrame((state, delta) => {
        if (!vehicleController || !chassisRef.current) return

        const { forward, backward, left, right, brake, reset }: any = getKeys()

        if (reset) {
            chassisRef.current.setTranslation({ x: 0, y: 2, z: 0 }, true)
            chassisRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true)
            chassisRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
            chassisRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
            forces.current.accel = 0
            forces.current.brake = 0
            return
        }

        if (forward) {
            forces.current.accel = Math.max(forces.current.accel - ACCEL_STEP, ACCEL_MIN)
        } else if (backward) {
            forces.current.accel = Math.min(forces.current.accel + ACCEL_STEP, ACCEL_MAX)
        } else {
            forces.current.accel = 0
            if (chassisRef.current.isSleeping()) chassisRef.current.wakeUp()
        }

        if (brake) {
            forces.current.brake = Math.min(forces.current.brake + BRAKE_STEP, BRAKE_MAX)
        } else {
            forces.current.brake = 0
        }

        vehicleController.setWheelEngineForce(0, forces.current.accel)
        vehicleController.setWheelEngineForce(1, forces.current.accel)

        const steerDirection = (left ? 1 : 0) + (right ? -1 : 0)
        const steerAngle = Math.PI / 4
        const currentSteering = vehicleController.wheelSteering(0)
        const steering = THREE.MathUtils.lerp(currentSteering, steerAngle * steerDirection, 0.25)

        vehicleController.setWheelSteering(0, steering)
        vehicleController.setWheelSteering(1, steering)

        const wheelBrake = (brake ? 1 : 0) * forces.current.brake
        vehicleController.setWheelBrake(0, wheelBrake)
        vehicleController.setWheelBrake(1, wheelBrake)
        vehicleController.setWheelBrake(2, wheelBrake)
        vehicleController.setWheelBrake(3, wheelBrake)

        // Update physical simulation with a clamped delta to prevent "explosion" after tab switching
        vehicleController.updateVehicle(Math.min(delta, 0.1))

        // Visual Updates
        const wheelSteeringQuat = new THREE.Quaternion()
        const wheelRotationQuat = new THREE.Quaternion()
        const up = new THREE.Vector3(0, 1, 0)

        wheelPositions.forEach((_, index) => {
            const wheelMesh = wheelRefs.current[index]
            if (!wheelMesh) return
            const axleCs = vehicleController.wheelAxleCs(index)
            const connection = (vehicleController.wheelChassisConnectionPointCs(index) as any).y || 0
            const suspension = vehicleController.wheelSuspensionLength(index) || 0
            const steering = vehicleController.wheelSteering(index) || 0
            const rotationRad = vehicleController.wheelRotation(index) || 0
            wheelMesh.position.y = connection - suspension
            wheelSteeringQuat.setFromAxisAngle(up, steering)
            wheelRotationQuat.setFromAxisAngle(axleCs, rotationRad)
            wheelMesh.quaternion.multiplyQuaternions(wheelSteeringQuat, wheelRotationQuat)
        })

        // Camera/OrbitControls Hybrid Sync
        if (controls) {
            const carPos = chassisRef.current.translation()
            const newTarget = new THREE.Vector3(carPos.x, carPos.y, carPos.z)

            // Calculate the current offset from the target to the camera
            const currentOffset = new THREE.Vector3().subVectors(state.camera.position, controls.target)

            // Move camera to maintain the SAME relative offset from the car
            state.camera.position.addVectors(newTarget, currentOffset)

            // Update the control's target to stay locked on the car
            controls.target.copy(newTarget)
            controls.update()

            if (onPositionUpdate) onPositionUpdate(newTarget)
        }
    })

    return (
        <RigidBody
            ref={chassisRef}
            colliders={false}
            position={[0, 2, 0]}
            mass={10}
            restitution={0.8}
        >
            {/* Main Chassis Base */}
            <mesh castShadow position={[0, -0.2, 0]}>
                <boxGeometry args={[2, 0.6, 4]} />
                <meshStandardMaterial color="#c0392b" />
            </mesh>
            {/* Top Cabin / Roll Cage area */}
            <mesh castShadow position={[0, 0.4, 0]}>
                <boxGeometry args={[1.6, 0.8, 2]} />
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
            </mesh>

            {wheelPositions.map((pos, index) => (
                <group key={index} ref={(el) => (wheelRefs.current[index] = el!)} position={pos}>
                    <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, WHEEL_WIDTH, 16]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                    {/* Interior Rim */}
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[WHEEL_RADIUS * 0.7, WHEEL_RADIUS * 0.7, WHEEL_WIDTH + 0.05, 16]} />
                        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
            ))}

            <CuboidCollider args={[1, 0.5, 2]} />
        </RigidBody>
    )
}
