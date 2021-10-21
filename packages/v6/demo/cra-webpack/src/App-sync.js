import routeGenerate from 'react-conventional-route-v6'
import { useRoutes } from 'react-router-dom';

// step0: define a component for choose the Type at Runtime
function RuntimeRoute ({componet}) {
  const RoutComp = componet
  return <RoutComp />
}

// step1: get all routing components
const routeCtx = require.context('./pages', true, /((?<!__tests__).)*\.route\.js/)

// step2: generate all routes, don't forget route.__esModule ? route.default : route
const routes = routeGenerate(routeCtx.keys(), (f)=> <RuntimeRoute componet={routeCtx(f).default} />, '.')
// you can see all routes array
console.log(routes)

// step3: return useRoutes(routes)
function App() {
  return useRoutes(routes)
}

export default App;