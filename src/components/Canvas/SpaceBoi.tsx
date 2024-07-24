import { FC, useEffect, useRef, useState } from 'react'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const SpaceBoi: FC = () => {
  const ref = useRef({ rotation: [0, Math.PI / 2, 0] })
  const [model, setModel] = useState(null)
  useEffect(() => {
    new GLTFLoader().load('/assets/scene.gltf', setModel)
  }, [setModel])

  return model ? <primitive ref={ref} object={model.scene} /> : <>no model found</>
}
export default SpaceBoi
