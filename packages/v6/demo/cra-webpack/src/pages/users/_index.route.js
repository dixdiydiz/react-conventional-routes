import {Outlet} from 'react-router-dom'

function Route() {
  return (
    <div>
      <p>In 'pages/users/_index.route.js'</p>
      <p>---------Outlet---------</p>
      <Outlet />
    </div>
  );
}

export default Route;