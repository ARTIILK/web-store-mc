import CoinPurchase from '../components/CoinPurchase';

export default function Coins() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter">
          WOOD<span className="text-mc-gold">COINS</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl">
          Purchase coins to unlock exclusive cosmetics, boosters, and items in-game.
        </p>
      </div>
      
      <CoinPurchase />
    </div>
  );
}
