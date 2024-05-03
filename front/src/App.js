import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header'
import Lazy from './Lazy';
const Home = lazy(() => import('./Components/Home'));
const Add = lazy(() => import('./Components/Add'));
const Login = lazy(() => import('./Components/Login'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Lazy />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
