import {Outlet} from 'react-router-dom'

function Route() {
  return (
    <div style={{ height: 300}}>
      <div style={{ display: 'inline-block', verticalAlign: 'top', width: 200, height: '100%', background: '#c7ecea' }}>
        <p>In '__sidebar/__sidebar.route.js'</p>
      </div>
      <div style={{ display: 'inline-block', width: 300, height: '100%', background: '#d5c7ec' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Route;