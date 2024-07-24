import { useEffect, useRef } from 'react'

import { CameraControls } from '@react-three/drei'

const CustomCameraControls = () => {
  const cameraControlsRef = useRef<CameraControls | null>(null)
  useEffect(() => {
    const controls = cameraControlsRef.current
    if (controls) {
      controls.lookInDirectionOf(-1500, -1450, -2000, true)
      controls.smoothTime = 1
      controls.mouseButtons.right = 0
    }
  }, [])
  return <CameraControls ref={cameraControlsRef} enabled distance={13} maxDistance={13} maxPolarAngle={Math.PI / 3} minDistance={13} minPolarAngle={Math.PI / 3} />
}

export default CustomCameraControls
