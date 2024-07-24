import React from 'react'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { AppRouter } from 'src/routes'

import 'src/styles/index.scss'

const root = document.getElementById('root')
if (!root) {
  throw new Error('root not found')
}
const container = createRoot(root)

const App = () => {
  return <RouterProvider router={AppRouter} />
}

container.render(<App />)
