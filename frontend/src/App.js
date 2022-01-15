import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import page from 'page';
import CustomerIndex from './Pages/Customer/Index';
import CustomerCreate from './Pages/Customer/Create';

const routes = {
  '/customer': CustomerIndex,
  '/customer/create': CustomerCreate,
  '/customer/:id': CustomerCreate,
  '*': CustomerIndex,
}

function App() {
  const [component, setComponent] = useState(null)

  useEffect(() => {
    page.base("/#")

    for (const path in routes) {
      page(path, ctx => setComponent(
        React.createElement(routes[path], ctx.params)
      ))
    }

    page()
  }, [])

  return component
}

export default App;
