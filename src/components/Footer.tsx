import { Link } from 'react-router-dom';
import { Shield, Mail, Heart, Twitter, Youtube, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mc-dark border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-mc-gold to-mc-orange flex items-center justify-center neon-glow-hover transition-all duration-300">
                <span className="font-display font-bold text-xl text-mc-dark">WM</span>
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-mc-gold transition-colors">
                WOOD<span className="text-mc-orange">MC</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
              The official store for WoodMC. Enhance your gameplay with premium ranks, exclusive kits, and special crates. All purchases directly support the server's development and hosting.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-mc-brown flex items-center justify-center text-gray-400 hover:text-mc-gold hover:bg-mc-brown/80 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-mc-brown flex items-center justify-center text-gray-400 hover:text-[#5865F2] hover:bg-mc-brown/80 transition-all">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-mc-brown flex items-center justify-center text-gray-400 hover:text-[#FF0000] hover:bg-mc-brown/80 transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-display font-bold mb-6">Store Links</h3>
            <ul className="space-y-4">
              <li><Link to="/ranks" className="text-gray-400 hover:text-mc-gold transition-colors text-sm">Premium Ranks</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-mc-orange transition-colors text-sm flex items-center gap-2">Special Offers <span className="bg-mc-orange/20 text-mc-orange text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span></Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-mc-gold transition-colors text-sm">My Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-mc-gold transition-colors text-sm flex items-center gap-2"><Shield size={14} /> Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-mc-gold transition-colors text-sm flex items-center gap-2"><Shield size={14} /> Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-mc-gold transition-colors text-sm flex items-center gap-2"><Mail size={14} /> Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WoodMC. Not affiliated with Mojang AB.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-mc-orange" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
