// App.tsx
import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import Toast from './common/toast';
function App() {
  return (
    <div>
      <Toast/>
      <RouterProvider router={routes} />

    </div>
  );
}

export default App;
