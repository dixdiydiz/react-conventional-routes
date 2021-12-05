import {Outlet} from 'react-router-dom'

function Route() {
  return (
    <div>
    <div>In 'about/about.$.route.js'</div>
      <Outlet />
    </div>
  );
}

export default Route;