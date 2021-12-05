import  { createElement, Fragment } from 'react';
import routeGenerate from 'react-conventional-route-v6'
import { useRoutes } from 'react-router-dom';

// default layout
// step1: get all routing components
const routeCtx = require.context('./pages', true, /^((?!__tests__).)*\.route\.js$/)

// step2: generate all routes, don't forget route.__esModule ? route.default : route
const routes = routeGenerate(routeCtx.keys(), (f)=> createElement(routeCtx(f).default), '.')
// you can see all routes array
console.log(routes)

// step3: useRoutes(routes)
function App() {
  return (
    <Fragment>
      {useRoutes(routes)}
    </Fragment>
  )
}

export default App;