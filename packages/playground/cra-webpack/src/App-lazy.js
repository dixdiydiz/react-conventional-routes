import  { createElement, Suspense, lazy } from 'react';
import createRoutes from 'react-conventional-routes'
import { useRoutes } from 'react-router-dom';
const NotFound = lazy(() => import('./components/404.js'))

// step1: get all routing components
const routeCtx = require.context('./routes', true, /^((?!__tests__).)*\.route\.js$/, 'lazy-once')
console.log(routeCtx.keys())

// step2: generate all routes
const routes = createRoutes(
  routeCtx.keys(),
  '.',
  {
    handler: (f)=> createElement(lazy(() => routeCtx(f))),
    suffix: 'route'
  }
)
// you can see all routes array
console.log(routes)

// step3: useRoutes(routes)
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {useRoutes([
        ...routes,
        {
          path: '*',
          element: <NotFound />
        }
      ])}
    </Suspense>
  )
}

export default App;
