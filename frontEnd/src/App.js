import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import HomeScreen from './pages/HomeScreen';
import AdminLogin from './pages/AdminLogin';
import AdminPage from './pages/AdminPage';
import AddUser from './pages/AddUser';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)



  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route index element={<HomeScreen />} />
          <Route path='/login' element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/admin' element={<AdminPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/adduser' element={<AddUser isLoggedIn={isLoggedIn} />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
