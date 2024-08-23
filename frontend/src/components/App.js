import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Home from '../components/pages/home/Home.jsx';
import SingleTour from '../components/pages/tour/Single Tour.jsx';
import About from '../components/pages/about/About.jsx';
import Login from '../components/pages/forms/Login.jsx';
import Register from '../components/pages/forms/Register.jsx';
import Footer from './footer/Footer.jsx';
import RequireAuth from '../components/RequireAuth/RequireAuth.js';

import { ContextProvider } from '../components/Auth/Auth.js'; // Importez votre fournisseur de contexte
import { Profile } from './Profile/Profile.js';


function App() {
  return (

      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tour/:id" element={<SingleTour />} />
            <Route path='/Profile' element={<RequireAuth> <Profile/> </RequireAuth>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ContextProvider>

  );
}

export default App;
