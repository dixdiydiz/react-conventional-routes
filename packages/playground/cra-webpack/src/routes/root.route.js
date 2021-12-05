import {Outlet} from 'react-router-dom'

function Route() {
  return (
    <div>
      <p>In 'routes/root.route.js'</p>
      <p>---------Outlet---------</p>
      <Outlet />
    </div>
  );
}

export default Route;