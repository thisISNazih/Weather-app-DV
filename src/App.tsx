import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import publicRoutes from './routes/publicRoutes';

const App = () => {
  return (
    <>
     <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.component}
          />
        ))}
        </Routes>
    </>
  );
}

export default App;
