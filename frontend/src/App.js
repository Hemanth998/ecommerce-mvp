import { Outlet } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';

import { useContext } from 'react';

function App() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is product 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is product 2',
      price: 200,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is product 3',
      price: 300,
    },
  ];

  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
