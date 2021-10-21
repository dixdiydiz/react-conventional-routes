import  { Suspense, lazy } from 'react';
import routeGenerate from 'react-conventional-route-v6'
import { useRoutes } from 'react-router-dom';

// step0: define a component for choose the Type at Runtime
function RuntimeRoute ({componet}) {
  const RoutComp = lazy(() => componet)
  return <RoutComp />
}

// step1: get all routing components
const routeCtx = require.context('./pages', true, /((?<!__tests__).)*\.route\.js/, 'lazy-once')

// step2: generate all routes
const routes = routeGenerate(routeCtx.keys(), (f)=> <RuntimeRoute componet={routeCtx(f)} />, '.')
// you can see all routes array
console.log(routes)

// step3: return useRoutes(routes)
function RoutesEle () {
  return useRoutes(routes)
}
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoutesEle />
    </Suspense>
  )
}

export default App;


// import routeGenerate from 'react-conventional-route-v6'
// import  { Suspense, lazy } from 'react';
// import {
//   BrowserRouter,
//   useRoutes
// } from 'react-router-dom';
//
// // require.context sync usage
// // const routeCtx = require.context('./pages', true, /((?<!__tests__).)*\.route\.js/, )
// // const Four = routeCtx(routeCtx.keys()[0]).default
// const routeCtx = require.context('./pages', true, /((?<!__tests__).)*\.route\.js/, 'lazy-once')
// // const Four = lazy(() => routeCtx(routeCtx.keys()[0]))
// // console.log(Four)
//
// // const routes = routeGenerate(routeCtx.keys(), (f)=> lazy(() => routeCtx(f)), '.')
// const routes = routeGenerate(routeCtx.keys(), (f)=> lazy(() => routeCtx(f)), '.')
// // console.log(routes)
//
// function RoutesEle () {
//   const element = useRoutes(routes)
//   console.log(element)
//   return element
// }
//
// function App() {
//     // return
//   const element = useRoutes(routes)
//   return (
//     <BrowserRouter >
//       <Suspense fallback={<div>Loading...</div>}>
//         <RoutesEle />
//       </Suspense>
//     </BrowserRouter>
//   )
// }
//
// export default App;
