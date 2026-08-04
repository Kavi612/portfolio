import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const POINT_COUNT = 52
const RADIUS = 2.15
const LINK_DISTANCE = 0.95

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

function NetworkMesh() {
  const groupRef = useRef(null)
  const pointsRef = useRef(null)
  const pulse = useRef(0)

  const { pointsGeo, linesGeo } = useMemo(() => {
    const pts = fibonacciSphere(POINT_COUNT, RADIUS)
    const pos = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => {
      pos[i * 3] = p.x
      pos[i * 3 + 1] = p.y
      pos[i * 3 + 2] = p.z
    })

    const segments = []
    for (let i = 0; i < pts.length; i += 1) {
      for (let j = i + 1; j < pts.length; j += 1) {
        if (pts[i].distanceTo(pts[j]) < LINK_DISTANCE) {
          segments.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3))

    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(segments), 3),
    )

    return { pointsGeo: pointsGeometry, linesGeo: linesGeometry }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.04
    groupRef.current.rotation.x = Math.sin(performance.now() * 0.00012) * 0.06

    pulse.current += delta
    if (pointsRef.current) {
      const mat = pointsRef.current.material
      mat.opacity = 0.7 + Math.sin(pulse.current * 0.8) * 0.08
      mat.size = 0.048 + Math.sin(pulse.current * 0.8) * 0.004
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeo}>
        <pointsMaterial
          color="#60A5FA"
          size={0.05}
          sizeAttenuation
          transparent
          depthWrite={false}
          opacity={0.75}
        />
      </points>

      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export default function NetworkGlobe() {
  return (
    <div className="relative h-[320px] w-full sm:h-[400px] lg:h-[480px]">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-blue-glow/15 blur-3xl" />
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.35} />
        <NetworkMesh />
      </Canvas>
    </div>
  )
}
