import { FC, useEffect } from 'react'

import { Canvas, useThree } from 'react-three-fiber'
import * as THREE from 'three'

import BloomEffect from 'src/components/Canvas/BloomEffect'
import CustomCameraControls from 'src/components/Canvas/CustomCameraControls'
import FixedText from 'src/components/Canvas/FixedText'
import SpaceBoi from 'src/components/Canvas/SpaceBoi'
import Cursor from 'src/components/Cursor'

import styles from './style.module.scss'

const SetInitialSettings = (): any => {
  const { camera, scene } = useThree()

  useEffect(() => {
    camera.rotation.y = Math.PI / 3
    camera.updateProjectionMatrix()
    scene.background = new THREE.Color('black')
  }, [camera, scene])
  return null
}

export const Home: FC = () => {
  return (
    <>
      <Cursor />
      <Canvas
        camera={{
          position: [0, 0, -10],
          near: 0.1,
          far: 1000,
          fov: 75
        }}
        className={styles.example}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFShadowMap
        }}
      >
        <ambientLight />
        <SetInitialSettings />
        <CustomCameraControls />
        <BloomEffect />
        <SpaceBoi />
        <FixedText />
      </Canvas>
    </>
  )
}

export default Home
