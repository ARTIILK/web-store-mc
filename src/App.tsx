/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ParticlesBackground from './components/ParticlesBackground';

// Pages
import Home from './pages/Home';
import Ranks from './pages/Ranks';
import Kits from './pages/Kits';
import Offers from './pages/Offers';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <ParticlesBackground />
        <Navbar />
        <CartSidebar />
        
        <main className="flex-grow pt-20 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ranks" element={<Ranks />} />
            <Route path="/kits" element={<Kits />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}
