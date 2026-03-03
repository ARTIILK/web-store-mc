import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import CartPanel from './components/CartPanel';
import Store from './pages/Store';
import Scene3D from './components/Scene3D';

function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-mc-dark text-white selection:bg-mc-enchant/30">
        {/* 3D Dynamic Background */}
        <Scene3D />

        {/* Decorative Ambient Background Overlay */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-mc-gold/5 rounded-full blur-[160px] opacity-20" />
          <div className="absolute bottom-[5%] right-[-5%] w-[40%] h-[40%] bg-mc-enchant/5 rounded-full blur-[160px] opacity-20" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Store />
          </main>

          <footer className="py-24 border-t border-white/5 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Brand Column */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/logo/woodmc.png" alt="Logo" className="h-10 w-auto" />
                    <span className="text-2xl font-display font-black tracking-tighter">
                      WOOD<span className="text-mc-gold">MC</span>
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                    Elevating the Minecraft survival experience since 2023. Our store offers premium digital items to enhance your journey on the WoodMC Network.
                  </p>
                </div>

                {/* Links Columns */}
                <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Quick Links</h4>
                  <ul className="space-y-4 text-sm font-bold text-gray-500">
                    <li><a href="/" className="hover:text-mc-gold transition-colors">Home Store</a></li>
                    <li><a href="https://discord.gg/woodmc" target="_blank" className="hover:text-mc-gold transition-colors">Join Discord</a></li>
                    <li><a href="#" className="hover:text-mc-gold transition-colors">Server Rules</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Legal</h4>
                  <ul className="space-y-4 text-sm font-bold text-gray-500">
                    <li><a href="#" className="hover:text-mc-gold transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-mc-gold transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-mc-gold transition-colors">Refund Policy</a></li>
                  </ul>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest text-center md:text-left">
                  WoodMC is not affiliated with Mojang AB or Microsoft. &copy; 2026 WoodMC Network.
                </p>
                <div className="flex gap-4">
                  <div className="h-8 px-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center grayscale opacity-50 text-[10px] font-black text-gray-400">STRIPE</div>
                  <div className="h-8 px-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center grayscale opacity-50 text-[10px] font-black text-gray-400">PAYPAL</div>
                </div>
              </div>
            </div>
          </footer>

          <CartPanel />
        </div>
      </div>
    </StoreProvider>
  );
}

export default App;
