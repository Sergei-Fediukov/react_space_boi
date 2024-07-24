import { FC, useEffect, useRef, useState } from 'react'

import { Text, useVideoTexture } from '@react-three/drei'
import { useFrame, useThree, Vector3 } from 'react-three-fiber'
import * as THREE from 'three'

import useViewportSize from 'src/hooks/useViewportSize'

const FixedText: FC = () => {
  const textRef = useRef(null)
  const [opacity, setOpacity] = useState(0)
  const [textSize, setTextSize] = useState(1.3)
  const duration = 5000 // Duration of the animation in ms
  const delay = 1000 // Delay before the animation starts in ms
  const startTime = useRef(null)
  const { camera } = useThree()
  const { width } = useViewportSize()

  useEffect(() => {
    if (width < 500) {
      setTextSize(0.5)
    } else if (width < 650) {
      setTextSize(0.8)
    } else if (width < 1250) {
      setTextSize(1.0)
    } else setTextSize(1.3)
  }, [width])

  useEffect(() => {
    const timer = setTimeout(() => {
      startTime.current = Date.now()
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useFrame(() => {
    if (startTime.current && textRef.current) {
      const elapsedTime = Date.now() - startTime.current
      if (elapsedTime < duration) {
        setOpacity(elapsedTime / duration)
      } else {
        setOpacity(1)
      }

      if (textRef.current && camera) {
        const { x, y, z } = camera.position
        const cameraDirection = new THREE.Vector3()
        camera.getWorldDirection(cameraDirection)

        textRef.current.position.set(x + cameraDirection.x * 5, y + cameraDirection.y * 10, z + cameraDirection.z * 5)
        textRef.current.rotation.copy(camera.rotation)
      }
    }
  })

  const texture = useVideoTexture('/assets/video_texture.mp4')
  return (
    <Text
      ref={textRef}
      color="white"
      font="/fonts/Inter-Bold.woff"
      fontSize={textSize}
      letterSpacing={-0.05}
      material-opacity={opacity}
      outlineColor="white"
      outlineWidth={0.02}
      scale={new Array(3).fill(1.7) as Vector3}
      textAlign="center"
    >
      {`space${width < 1250 ? '\n' : ' '}boi`.toUpperCase()}
      <meshStandardMaterial transparent emissive="white" emissiveIntensity={0.01} map={texture} opacity={opacity} />
    </Text>
  )
}

export default FixedText
