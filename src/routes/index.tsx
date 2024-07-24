import { createBrowserRouter, RouteObject } from 'react-router-dom'

import Home from 'src/pages/Home'
import { NotFound } from 'src/pages/NotFound'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/*',
    element: <NotFound />
  }
]
export const AppRouter = createBrowserRouter(routes)
