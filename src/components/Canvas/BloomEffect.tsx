import { FC, useState } from 'react'

import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { useFrame, useThree } from 'react-three-fiber'

const BloomEffect: FC = () => {
  const { camera } = useThree()
  const [prevCameraRotation, setPrevCameraRotation] = useState(camera.rotation.clone())
  const [sceneIsRotating, setSceneIsRotating] = useState(false)
  useFrame(() => {
    // Check if the camera rotation has changed
    const currentCameraRotation = camera.rotation.clone()
    if (!prevCameraRotation.equals(currentCameraRotation)) {
      setSceneIsRotating(true)
      setPrevCameraRotation(currentCameraRotation)
    } else {
      setSceneIsRotating(false)
    }
  })
  return (
    <EffectComposer enableNormalPass={false}>
      <Bloom mipmapBlur intensity={sceneIsRotating ? 2.5 : 0} levels={10} luminanceThreshold={0.1} />
      <ToneMapping />
    </EffectComposer>
  )
}

export default BloomEffect
