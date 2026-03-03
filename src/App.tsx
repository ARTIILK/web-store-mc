import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import CartPanel from './components/CartPanel';
import Store from './pages/Store';

function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-mc-dark text-white selection:bg-mc-gold selection:text-mc-dark">
        {/* Decorative Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mc-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-mc-orange/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <main>
            <Store />
          </main>

          <footer className="py-20 border-t border-white/5 bg-black/20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 mb-4">
                  <img src="/src/logo/woodmc.png" alt="Logo" className="h-8 w-auto grayscale opacity-50" />
                  <span className="text-xl font-display font-black tracking-tighter text-gray-500">
                    WOOD<span className="text-gray-600">MC</span>
                  </span>
                </div>
                <p className="text-gray-600 text-sm max-w-xs text-center md:text-left">
                  WoodMC is not affiliated with Mojang AB. © 2026 WoodMC Network.
                </p>
              </div>

              <div className="flex gap-8 text-gray-500 text-sm font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-mc-gold transition-colors">Privacy</a>
                <a href="#" className="hover:text-mc-gold transition-colors">Terms</a>
                <a href="#" className="hover:text-mc-gold transition-colors">Support</a>
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
