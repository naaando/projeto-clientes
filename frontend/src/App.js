import './App.css';
import { useEffect, useState } from 'react';
import page from 'page';
import CustomerIndex from './Pages/Customer/Index';
import CustomerCreate from './Pages/Customer/Create';

const routes = {
  '/': CustomerIndex,
  '/customer': CustomerIndex,
  '/customer/create': CustomerCreate,
}

function startRouting(setRoute) {
  page.base("/#")

  for (const path in routes) {
    page(path, () => setRoute(path))
  }

  page()
}

function App() {
  const [route, setRoute] = useState(null)
  const ActiveRoute = routes[route]
  useEffect(() => startRouting(setRoute), [])

  return (
    <div className="App">
      {route && <ActiveRoute />}
    </div>
  );
}

export default App;
