import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const POINT_COUNT = 90
const RADIUS = 2.15
const LINK_DISTANCE = 1.15
const REPEL_RADIUS = 2.4
const REPEL_STRENGTH = 0.55

function fibonacciSphere(count, radius) {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    )
  }

  return points
}

function NetworkMesh({ isHovered, onHoverChange }) {
  const groupRef = useRef(null)
  const pointsRef = useRef(null)
  const linesRef = useRef(null)
  const speedRef = useRef(0.04)
  const pulse = useRef(0)

  // Base Fibonacci sphere positions
  const basePoints = useMemo(() => fibonacciSphere(POINT_COUNT, RADIUS), [])

  // Current displaced points (for smooth spring-back)
  const currentPoints = useRef(basePoints.map((p) => p.clone()))

  // Pairs of point indices within link distance
  const links = useMemo(() => {
    const pairs = []
    for (let i = 0; i < basePoints.length; i += 1) {
      for (let j = i + 1; j < basePoints.length; j += 1) {
        if (basePoints[i].distanceTo(basePoints[j]) < LINK_DISTANCE) {
          pairs.push([i, j])
        }
      }
    }
    return pairs
  }, [basePoints])

  // Initial geometries
  const { pointsGeo, linesGeo } = useMemo(() => {
    const pos = new Float32Array(POINT_COUNT * 3)
    basePoints.forEach((p, i) => {
      pos[i * 3] = p.x
      pos[i * 3 + 1] = p.y
      pos[i * 3 + 2] = p.z
    })

    const linePos = new Float32Array(links.length * 6)
    links.forEach(([i, j], k) => {
      const idx = k * 6
      linePos[idx] = basePoints[i].x
      linePos[idx + 1] = basePoints[i].y
      linePos[idx + 2] = basePoints[i].z
      linePos[idx + 3] = basePoints[j].x
      linePos[idx + 4] = basePoints[j].y
      linePos[idx + 5] = basePoints[j].z
    })

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))

    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))

    return { pointsGeo: pGeo, linesGeo: lGeo }
  }, [basePoints, links])

  // Reusable vector / plane allocations for 60fps loop
  const zPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const mouseWorld = useMemo(() => new THREE.Vector3(), [])
  const localMouse = useMemo(() => new THREE.Vector3(), [])
  const tempDiff = useMemo(() => new THREE.Vector3(), [])
  const tempTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // 1. ROTATION SPEED INCREASE ON HOVER
    const targetSpeed = isHovered ? 0.22 : 0.04
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, delta * 3)
    groupRef.current.rotation.y += delta * speedRef.current

    // Subtle tilt toward cursor
    const targetRotX = state.pointer.y * 0.25
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 2,
    )

    // Pulse animation
    pulse.current += delta
    if (pointsRef.current) {
      const mat = pointsRef.current.material
      mat.opacity = 0.8 + Math.sin(pulse.current * 0.9) * 0.1
      mat.size = (isHovered ? 0.075 : 0.06) + Math.sin(pulse.current * 0.9) * 0.005
    }

    // 2. REACTIVE NEURAL NETWORK VERTICES (REPEL FROM CURSOR)
    state.raycaster.setFromCamera(state.pointer, state.camera)
    state.raycaster.ray.intersectPlane(zPlane, mouseWorld)

    // Convert world mouse coordinates to globe local space
    localMouse.copy(mouseWorld)
    groupRef.current.worldToLocal(localMouse)

    const posAttr = pointsGeo.getAttribute('position')
    const posArray = posAttr.array

    // Displace vertices based on distance to local mouse cursor
    for (let i = 0; i < POINT_COUNT; i += 1) {
      const base = basePoints[i]
      const curr = currentPoints.current[i]

      tempDiff.subVectors(base, localMouse)
      const dist = tempDiff.length()

      tempTarget.copy(base)
      if (dist < REPEL_RADIUS && dist > 0.001) {
        // Repel vertex away from cursor
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
        tempDiff.normalize().multiplyScalar(force)
        tempTarget.add(tempDiff)
      }

      // Smooth lerp toward target
      curr.lerp(tempTarget, delta * 7)

      posArray[i * 3] = curr.x
      posArray[i * 3 + 1] = curr.y
      posArray[i * 3 + 2] = curr.z
    }
    posAttr.needsUpdate = true

    // Sync connecting network lines to updated vertex positions
    const lineAttr = linesGeo.getAttribute('position')
    const lineArray = lineAttr.array
    for (let k = 0; k < links.length; k += 1) {
      const [i, j] = links[k]
      const p1 = currentPoints.current[i]
      const p2 = currentPoints.current[j]
      const idx = k * 6
      lineArray[idx] = p1.x
      lineArray[idx + 1] = p1.y
      lineArray[idx + 2] = p1.z
      lineArray[idx + 3] = p2.x
      lineArray[idx + 4] = p2.y
      lineArray[idx + 5] = p2.z
    }
    lineAttr.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      {/* Invisible interaction hit sphere for hover detection */}
      <mesh
        onPointerOver={() => onHoverChange(true)}
        onPointerOut={() => onHoverChange(false)}
        visible={false}
      >
        <sphereGeometry args={[RADIUS * 1.25, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <points ref={pointsRef} geometry={pointsGeo}>
        <pointsMaterial
          color="#60A5FA"
          size={0.06}
          sizeAttenuation
          transparent
          depthWrite={false}
          opacity={0.9}
        />
      </points>

      <lineSegments ref={linesRef} geometry={linesGeo}>
        <lineBasicMaterial
          color="#3B82F6"
          transparent
          opacity={isHovered ? 0.45 : 0.25}
          depthWrite={false}
        />
      </lineSegments>

      <Sparkles
        count={isHovered ? 45 : 28}
        scale={4.2}
        size={isHovered ? 3 : 2}
        speed={isHovered ? 0.6 : 0.25}
        opacity={0.4}
        color="#60A5FA"
      />
    </group>
  )
}

export default function NetworkGlobe() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative h-[320px] w-full sm:h-[400px] lg:h-[480px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-full blur-3xl transition-opacity duration-500 ${
          isHovered ? 'bg-blue-glow/35 opacity-100' : 'bg-blue-glow/20 opacity-70'
        }`}
      />
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <NetworkMesh isHovered={isHovered} onHoverChange={setIsHovered} />
      </Canvas>
    </div>
  )
}
