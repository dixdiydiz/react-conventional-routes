import  { createElement, Suspense, lazy } from 'react';
import routeGenerate from 'react-conventional-route-v6'
import { useRoutes } from 'react-router-dom';
import Layout from '../components/layout'

// step1: get all routing components
// exclude board/ files
const routeCtx = require.context('./pages', true, /^((?!__tests__).)*\.route\.js$/, 'lazy-once')
console.log(routeCtx.keys())

// step2: generate all routes
const routes = routeGenerate(
  routeCtx.keys(),
  (f)=> createElement(lazy(() => routeCtx(f))),
  '.'
)
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
