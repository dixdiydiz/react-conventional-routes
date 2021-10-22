import  { createElement, Suspense, lazy } from 'react';
import routeGenerate from 'react-conventional-route-v6'
import { useRoutes } from 'react-router-dom';

// step1: get all routing components
const routeCtx = require.context('./pages', true, /((?<!__tests__).)*\.route\.js/, 'lazy-once')

// step2: generate all routes
const routes = routeGenerate(routeCtx.keys(), (f)=> createElement(lazy(() => routeCtx(f))), '.')
// you can see all routes array
console.log(routes)

// step3: useRoutes(routes)
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {useRoutes(routes)}
    </Suspense>
  )
}

export default App;
